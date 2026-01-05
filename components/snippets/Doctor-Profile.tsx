"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BadgeCheck, Stethoscope } from 'lucide-react';
import { Label } from '../ui/label';

const DoctorProfile = ({ name, experience, qualification, specialization, verified }: { name: string, experience: number, qualification: string, specialization: string, verified: boolean }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Your professional information</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                    <Avatar className="w-20 h-20 bg-red-50">
                        <AvatarFallback className="bg-red-50">
                            {
                                verified ? <BadgeCheck className="w-10 h-10 text-blue-600" /> : <Stethoscope className="w-10 h-10 text-red-600" />
                            }
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label className="text-sm font-medium text-gray-500 block mb-2">
                            Specialization
                        </Label>
                        <p className="text-lg text-gray-900">{specialization}</p>
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-500 block mb-2">
                            Qualification
                        </Label>
                        <p className="text-lg text-gray-900">{qualification}</p>
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-500 block mb-2">
                            Years of Experience
                        </Label>
                        <p className="text-lg text-gray-900">{experience}</p>
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-500 block mb-2">
                            verified
                        </Label>
                        <p className="text-lg text-gray-900">
                            {verified ? "Yes" : "No"}
                        </p>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                        <span className="font-semibold">Access Permissions:</span> You can view records of patients who have specifically authorized you or your specialization. All access is view-only.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default DoctorProfile
