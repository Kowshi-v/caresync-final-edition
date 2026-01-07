"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { contractDetails } from "@/metadata/contract";

const TARGET_CHAIN_ID = "0x3909";

export function useContractHook() {
    const [instance, setInstance] = useState<ethers.Contract | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            if (!globalThis.window.ethereum) return toast.error("MetaMask not found");

            try {
                const chainId = await globalThis.window.ethereum.request({ method: "eth_chainId" });

                if (chainId !== TARGET_CHAIN_ID) {
                    await globalThis.window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: TARGET_CHAIN_ID }],
                    });
                }

                await globalThis.window.ethereum.request({ method: "eth_requestAccounts" });

                const provider = new ethers.BrowserProvider(globalThis.window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                const contract = new ethers.Contract(
                    contractDetails.contractAddress,
                    contractDetails.abi,
                    signer
                );

                setInstance(contract);
                setUserAddress(address);

                try {
                    const role = await contract.roles(address);

                    if (role === BigInt(1)) {
                        localStorage.setItem("role", "patient");
                    } else if (role === BigInt(2)) {
                        localStorage.setItem("role", "doctor");
                    }
                } catch {
                    console.error("Role check skipped (new user or error)");
                }

            } catch (e: any) {
                console.error("Wallet init error:", e);
                toast.error(e?.message || "Wallet init failed");
            }
        };

        init();

        if (globalThis.window.ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length === 0) {
                    toast.error("Please connect your wallet");
                } else {
                    console.info("Account changed, reloading...");
                }
            };

            const handleChainChanged = (chainId: string) => {
                console.info("Chain changed to:", chainId);
                if (chainId !== TARGET_CHAIN_ID) {
                    toast.error("Please switch back to Sonic Testnet");
                }
            };

            globalThis.window.ethereum.on("accountsChanged", handleAccountsChanged);
            globalThis.window.ethereum.on("chainChanged", handleChainChanged);

            return () => {
                globalThis.window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
                globalThis.window.ethereum.removeListener("chainChanged", handleChainChanged);
            };
        }
    }, []);

    const ensureCorrectNetwork = async () => {
        if (!globalThis.window.ethereum) {
            throw new Error("MetaMask not found");
        }

        const chainId = await globalThis.window.ethereum.request({ method: "eth_chainId" });

        if (chainId !== TARGET_CHAIN_ID) {
            toast.error("Wrong network! Switching to Sonic Testnet...");
            await globalThis.window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: TARGET_CHAIN_ID }],
            });

            const provider = new ethers.BrowserProvider(globalThis.window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            const contract = new ethers.Contract(
                contractDetails.contractAddress,
                contractDetails.abi,
                signer
            );

            setInstance(contract);
            setUserAddress(address);

            return contract;
        }

        return instance;
    };

    const registerAsDoctor = async (
        setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (!instance || !userAddress) {
            console.error("Contract not ready");
            return;
        }

        try {
            const contract = await ensureCorrectNetwork();
            if (!contract) {
                toast.error("Failed to connect to correct network");
                return;
            }

            const currentRole = await contract.roles(userAddress);
            if (currentRole === BigInt(1)) {
                toast.error("Already registered as PATIENT");
                return;
            }

            if (currentRole === BigInt(2)) {
                toast.info("Already registered as DOCTOR");
                setIsRegistered(true);
                localStorage.setItem("role", "doctor");
                return;
            }

            toast.info("Sending transaction...");
            const tx = await contract.registerAsDoctor({ gasLimit: 1_000_000 });
            console.info("Transaction hash:", tx.hash);

            toast.info("Waiting for confirmation...");
            const receipt = await tx.wait();

            if (receipt.status === 1) {
                setIsRegistered(true);
                localStorage.setItem("role", "doctor");
                toast.success("Successfully registered as Doctor!");
            } else {
                toast.error("Transaction failed");
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    let isRegistering = false;

    const registerAsPatient = async () => {
        if (!instance || !userAddress || isRegistering) return;
        isRegistering = true;

        try {
            const contract = await ensureCorrectNetwork();
            if (!contract) return;

            const currentRole = await contract.roles(userAddress);

            if (currentRole === BigInt(1)) {
                toast.info("Already registered as PATIENT");
                return;
            }

            if (currentRole === BigInt(2)) {
                toast.error("Already registered as DOCTOR");
                return;
            }

            toast.info("Sending transaction...");
            const tx = await contract.registerAsPatient({
                gasLimit: 1_000_000,
            });

            const receipt = await tx.wait();

            if (receipt?.status === 1) {
                toast.success("Successfully registered as Patient!");
            }
        } catch (err) {
            console.error("TX ERROR:", err);
        } finally {
            isRegistering = false;
        }
    };

    const setDoctorProfile = async (
        isRegistered: boolean,
        name: string,
        qualification: string,
        specialization: string,
        experience: number
    ) => {
        if (!instance) {
            toast.error("Not ready");
            return;
        }

        if (!name || name.trim() === "") {
            toast.error("Name is required");
            return;
        }

        try {
            const contract = await ensureCorrectNetwork();
            if (!contract) {
                toast.error("Failed to connect to correct network");
                return;
            }

            toast.info("Updating profile...");
            const tx = await contract.setDoctorProfile(
                name,
                qualification,
                specialization,
                experience,
                { gasLimit: 1_000_000 }
            );

            const receipt = await tx.wait();

            if (receipt.status === 1) {
                toast.success("Profile updated successfully!");
                globalThis.window.location.reload();
            } else {
                toast.error("Transaction failed");
            }
        } catch (e: any) {
            console.error("Profile update error:", e);

            if (e.code === "NETWORK_ERROR") {
                toast.error("Network changed during transaction. Please try again.");
            } else if (e.message?.includes("Not a doctor")) {
                toast.error("You must be registered as a doctor first");
            } else {
                toast.error(e?.reason || e?.message || "Profile update failed");
            }
        }
    };

    const getDoctorProfile = async (address: string) => {
        if (!instance) {
            console.error("Contract instance not ready");
            return null;
        }

        try {
            const profile = await instance.getDoctorProfile(address);

            return {
                name: profile.name,
                qualification: profile.qualification,
                specialization: profile.specialization,
                experience: Number(profile.experience),
                verified: profile.verified
            };
        } catch {
            console.error("Profile not found for address:", address);
            return null;
        }
    };

    //assume meta as description
    const uploadReport = async (cid: string, meta: string) => {
        if (!instance || !userAddress) {
            toast.error("Contract not ready");
            return null;
        }

        try {
            const tx = await instance.uploadReport(cid, meta, {
                gasLimit: 1_000_000
            });
            const receipt = await tx.wait();

            toast.success("Report uploaded");
            globalThis.window.location.reload();
            return receipt;
        } catch (err: any) {
            console.error(err);
            toast.error(err?.reason || "Upload report failed");
            return null;
        }
    };

    const getMyReports = async () => {
        if (!instance || !userAddress) return [];

        const ids = await instance.getMyReports();

        const reports = await Promise.all(
            ids.map(async (id: bigint) => {
                const r = await instance.getReport(id);
                return {
                    id: r[0].toString(),
                    patient: r[1],
                    doctor: r[2],
                    cid: r[3],
                    meta: r[4],
                    timestamp: Number(r[5]),
                };
            })
        );

        console.log("Fetched reports:", reports);

        return reports;
    };

    const verifyDoctor = async (address: string) => {
        if (!instance || !userAddress) {
            toast.error("Contract not ready");
            return null;
        }

        try {
            const tx = await instance.verifyDoctor(address, {
                gasLimit: 1_000_000
            });
            await tx.wait();
            toast.success("Doctor verified");
            globalThis.window.location.reload();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.reason || "Verify doctor failed");
            return null;
        }
    }

    const revokeDoctor = async (address: string) => {
        if (!instance || !userAddress) {
            toast.error("Contract not ready");
            return null;
        }

        try {
            const tx = await instance.revokeDoctor(address, {
                gasLimit: 1_000_000
            });
            await tx.wait();

            toast.success("Doctor revoked");
            globalThis.window.location.reload();
        } catch (e: any) {
            console.error(e);
            toast.error(e?.reason || "Revoke doctor failed");
            return null;
        }
    }

    const getVerifiedDoctors = async () => {
        if (!instance || !userAddress) return [];

        try {
            const res = await instance.getVerifiedDoctors();
            return res;
        } catch (e: any) {
            toast.error(e?.reason || "Get verified doctors failed");
            return [];
        }
    }

    const getAllDoctors = async () => {
        if (!instance) return [];

        try {
            const res = await instance.getAllDoctors();
            return res;
        } catch (e: any) {
            console.error(e);
            toast.error(e?.reason || "Get all doctors failed");
            return [];
        }
    };

    const assignDoctor = async (reportId: number, doctorAddress: string) => {
        if (!instance || !userAddress) return null;

        try {
            const tx = await instance.assignDoctor(
                reportId,
                doctorAddress,
                {
                    gasLimit: 1_000_000
                }
            );
            await tx.wait();

            toast.success("doctor assigned successfully !!!")
            globalThis.window.location.reload();
        } catch (e: any) {
            console.error(e);
            toast.error(e?.reason || "Assign doctor failed");
            return null;
        }
    }

    const getDoctorName = async (address: string) => {
        const res = await getDoctorProfile(address);
        return res ? res.name : "Unknown Doctor";
    }

    const getDoctorReports = async () => {
        if (!instance || !userAddress) return [];

        try {
            const res = await instance.getAssignedReports();

            const ids: bigint[] = Array.from(res);

            const reports = await Promise.all(
                ids.map(async (id: bigint) => {
                    const r = await instance.getReport(id);
                    return {
                        id: r[0].toString(),
                        patient: r[1],
                        doctor: r[2],
                        cid: r[3],
                        meta: r[4],
                        timestamp: Number(r[5]),
                    };
                })
            );

            return reports;
        } catch {
            return [];
        }
    };

    //updating report by doctor
    const updateReport = async (reportId: number, newCid: string, newMeta: string) => {
        if (!instance || !userAddress) return null;

        try {
            const res = await instance.doctorUpdateReport(
                reportId,
                newCid,
                newMeta,
                {
                    gasLimit: 1_000_000
                }
            );
            await res.wait();
            toast.success("Report updated successfully !!!")
            globalThis.window.location.reload();
        } catch {
            toast.error("Update report failed");
            return null;
        }
    }

    const checkUserRole = async () => {
        if (!instance || !userAddress) return null;

        try {
            const role = await instance.roles(userAddress);
            const roleNum = Number(role);

            const roleNames = ["NONE", "PATIENT", "DOCTOR"];

            return {
                roleNumber: roleNum,
                roleName: roleNames[roleNum],
                address: userAddress
            };
        } catch (e) {
            console.error("Role check error:", e);
            return null;
        }
    };

    return {
        instance,
        userAddress,
        registerAsDoctor,
        registerAsPatient,
        setDoctorProfile,
        getDoctorProfile,
        checkUserRole,
        uploadReport,
        getMyReports,
        verifyDoctor,
        revokeDoctor,
        getVerifiedDoctors,
        getAllDoctors,
        assignDoctor,
        getDoctorName,
        getDoctorReports,
        updateReport
    };

}
