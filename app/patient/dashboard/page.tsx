"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UploadFileDialog } from '@/components/dialog/uploadFileDialog';
import { useContractHook } from '@/hooks/useContractHook';
import { useEffect, useState } from 'react';
import { MedicalReport } from '@/types/patient';
import { AssignDoctorDialog } from '@/components/dialog/assignDoctorDialog';

export default function PatientDashboard() {
    const { getMyReports, instance, userAddress } = useContractHook();
    const [data, setData] = useState<MedicalReport[]>([]);

    useEffect(() => {
        if (!instance || !userAddress) return;

        const fetchData = async () => {
            const reports = await getMyReports();
            setData(reports);
        };

        fetchData();
    }, [instance, userAddress]);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-red-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-red-900">Patient Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                Welcome back, <span className="font-semibold text-red-900">{userAddress}</span>
                            </p>
                        </div>
                        <ConnectButton />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">Medical Records</CardTitle>
                                <CardDescription className="mt-2">
                                    Manage your medical records and control access permissions
                                </CardDescription>
                            </div>
                            <UploadFileDialog />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {data.length === 0 ? (
                            <p className="text-gray-500">No reports uploaded yet</p>
                        ) : (
                            <div className="space-y-4">
                                {data.map((report) => (
                                    <div
                                        key={report.id}
                                        className="border rounded-lg p-4 space-y-3"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <FileText className="w-5 h-5 text-red-600 mt-1" />
                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        Report #{report.id}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {report.meta}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <AssignDoctorDialog />

                                                <a
                                                    href={`https://gateway.pinata.cloud/ipfs/${report.cid}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600"
                                                >
                                                    View Report
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex gap-6 text-sm text-gray-600">
                                            <span>
                                                {new Date(report.timestamp * 1000).toLocaleDateString()}
                                            </span>
                                            <span>
                                                {report.doctor ===
                                                    "0x0000000000000000000000000000000000000000"
                                                    ? "No doctor assigned"
                                                    : "Doctor assigned"}
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