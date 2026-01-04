"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock } from 'lucide-react';
import DoctorProfile from '@/components/snippets/Doctor-Profile';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useContractHook } from '@/hooks/useContractHook';
import { DoctorProfile as docp } from '@/types/doctor';

export default function DoctorDashboard() {
    const { getDoctorProfile, instance, userAddress } = useContractHook();
    const [data, setData] = useState<docp>({
        experience: 0,
        name: "",
        qualification: "",
        specialization: "",
        verified: false,
    })

    useEffect(() => {
        const fetchProfile = async () => {
            if (instance && userAddress) {
                const res = await getDoctorProfile(userAddress);

                if (res) {
                    setData({
                        experience: Number(res.experience),
                        name: res.name,
                        qualification: res.qualification,
                        specialization: res.specialization,
                        verified: res.verified,
                    });
                } else {
                    console.log("No profile set yet");
                }
            }
        }

        fetchProfile();
    }, [instance, userAddress, getDoctorProfile]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-red-800">Doctor Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                Welcome back, <span className="text-red-700 font-semibold">Dr. {data.name}</span>
                            </p>
                        </div>
                        <ConnectButton />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <Tabs defaultValue="records" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="records">Accessible Records</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="records" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Medical Records</CardTitle>
                                <CardDescription>Records you have been authorized to view</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <Lock className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No records available</h3>
                                    <p className="text-gray-500">
                                        Patients must grant you permission to view their records.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="profile" className="mt-6">
                        <DoctorProfile experience={data.experience} name={data.name} qualification={data.qualification} specialization={data.specialization} verified={data.verified} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}