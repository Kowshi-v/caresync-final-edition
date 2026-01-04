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
                    window.location.reload();
                }
            };

            const handleChainChanged = (chainId: string) => {
                console.info("Chain changed to:", chainId);
                if (chainId !== TARGET_CHAIN_ID) {
                    toast.error("Please switch back to Sonic Testnet");
                }
                window.location.reload();
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
            toast.error("Contract not ready");
            return;
        }

        try {
            const contract = await ensureCorrectNetwork();
            if (!contract) {
                toast.error("Failed to connect to correct network");
                return;
            }

            const currentRole = await contract.roles(userAddress);
            console.info("Current role:", currentRole.toString());

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
            console.error("Registration error:", e);

            if (e.code === "NETWORK_ERROR") {
                toast.error("Network changed during transaction. Please try again.");
            } else if (e.message?.includes("Already registered")) {
                toast.error("Already registered");
            } else {
                toast.error(e?.reason || e?.message || "Registration failed");
            }
        }
    };

    const registerAsPatient = async () => {
        if (!instance || !userAddress) {
            toast.error("Contract not ready");
            return;
        }

        try {
            const contract = await ensureCorrectNetwork();
            if (!contract) {
                toast.error("Failed to connect to correct network");
                return;
            }

            const currentRole = await contract.roles(userAddress);
            console.info("Current role:", currentRole.toString());

            if (currentRole === BigInt(2)) {
                toast.error("Already registered as DOCTOR");
                return;
            }

            if (currentRole === BigInt(1)) {
                toast.info("Already registered as PATIENT");
                localStorage.setItem("role", "patient");
                return;
            }

            toast.info("Sending transaction...");
            const tx = await contract.registerAsPatient({ gasLimit: 1_000_000 });
            console.info("Transaction hash:", tx.hash);

            toast.info("Waiting for confirmation...");
            const receipt = await tx.wait();

            if (receipt.status === 1) {
                localStorage.setItem("role", "patient");
                toast.success("Successfully registered as Patient!");
            } else {
                toast.error("Transaction failed");
            }
        } catch (e: any) {
            console.error("Registration error:", e);

            if (e.code === "NETWORK_ERROR") {
                toast.error("Network changed during transaction. Please try again.");
            } else if (e.message?.includes("Already registered")) {
                toast.error("Already registered");
            } else {
                toast.error(e?.reason || e?.message || "Registration failed");
            }
        }
    };

    const setDoctorProfile = async (
        isRegistered: boolean,
        name: string,
        qualification: string,
        specialization: string,
        experience: number
    ) => {
        if (!instance || !isRegistered) {
            toast.error("Not ready or not registered as doctor");
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
            console.log("Profile found:", {
                name: profile.name,
                qualification: profile.qualification,
                specialization: profile.specialization,
                experience: profile.experience.toString(),
                verified: profile.verified
            });

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
        checkUserRole
    };
}