"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UploadFileDialog } from "@/components/dialog/uploadFileDialog";
import { AssignDoctorDialog } from "@/components/dialog/assignDoctorDialog";
import { useContractHook } from "@/hooks/useContractHook";
import { useEffect, useState } from "react";
import { MedicalReport } from "@/types/patient";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function PatientDashboard() {
    const {
        getMyReports,
        instance,
        userAddress,
        getDoctorProfile,
    } = useContractHook();

    const [data, setData] = useState<MedicalReport[]>([]);
    const [doctorNames, setDoctorNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!instance || !userAddress) return;

        const fetchReports = async () => {
            setLoading(true);

            const reports = await getMyReports();
            const normalized = Array.from(reports);

            setData(normalized);
            setLoading(false);
        };

        fetchReports();
    }, [instance, userAddress]);

    useEffect(() => {
        if (data.length === 0) return;

        const loadDoctorNames = async () => {
            const names: Record<string, string> = {};

            await Promise.all(
                data.map(async (report) => {
                    const doctor = report.doctor;

                    if (doctor && doctor !== ZERO_ADDRESS && !names[doctor]) {
                        const profile = await getDoctorProfile(doctor);
                        names[doctor] = profile?.name ?? "Unknown Doctor";
                    }
                })
            );

            setDoctorNames(names);
        };

        loadDoctorNames();
    }, [data]);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-red-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-red-900">
                            Patient Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Welcome back{" "}
                            <span className="font-semibold text-red-900">
                                {userAddress}
                            </span>
                        </p>
                    </div>
                    <ConnectButton />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">
                                    Medical Records
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    Manage your medical records and control access
                                    permissions
                                </CardDescription>
                            </div>
                            <UploadFileDialog />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {loading ? (
                            <p className="text-gray-500">Loading reports...</p>
                        ) : data.length === 0 ? (
                            <p className="text-gray-500">
                                No reports uploaded yet
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {data.map((report) => (
                                    <div
                                        key={report.id.toString()}
                                        className="border rounded-lg p-4 space-y-3"
                                    >
                                        <div className="flex justify-between">
                                            <div className="flex gap-3">
                                                <FileText className="w-5 h-5 text-red-600 mt-1" />
                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        Report #
                                                        {Number(report.id)}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {report.meta}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <AssignDoctorDialog
                                                    reportId={report.id.toString()}
                                                />
                                                <a
                                                    href={`https://gateway.pinata.cloud/ipfs/${report.cid}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                                >
                                                    View Report
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 text-sm text-gray-600">
                                            <span>
                                                {new Date(
                                                    Number(report.timestamp) *
                                                    1000
                                                ).toLocaleDateString()}
                                            </span>
                                            <span>
                                                Doctor : {report.doctor === ZERO_ADDRESS
                                                    ? "No doctor assigned"
                                                    : doctorNames[
                                                    report.doctor
                                                    ] ?? "Loading doctor..."}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
