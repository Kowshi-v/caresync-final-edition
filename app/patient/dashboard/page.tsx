"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Shield } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UploadFileDialog } from '@/components/dialog/uploadFileDialog';
import { useState } from 'react';

export default function PatientDashboard() {
    const [hash, setHash] = useState<string>("");

    console.log(hash);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-red-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-red-900">Patient Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                Welcome back, <span className="font-semibold text-red-900">xsaxa</span>
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
                            <UploadFileDialog setIpfsHash={setHash} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-red-600 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg">PC-BCS702LAB updated.pdf</h3>
                                        <p className="text-sm text-gray-500">cscdsa</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Shield className="w-4 h-4" />
                                        Manage Access
                                    </Button>
                                    <Button variant="destructive" size="sm" className="gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-6 text-sm text-gray-600">
                                <span>1/4/2026</span>
                                <span>1 doctors authorized</span>
                                <span>2 specializations</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}