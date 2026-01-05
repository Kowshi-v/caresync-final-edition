"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, User, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useContractHook } from "@/hooks/useContractHook";
import { DoctorProfileWithWallet } from "@/types/doctor";

export function AssignDoctorDialog({ reportId }: { readonly reportId: string }) {
    const { instance, getVerifiedDoctors, getDoctorProfile, assignDoctor } = useContractHook();
    const [profiles, setProfiles] = useState<DoctorProfileWithWallet[]>([]);

    useEffect(() => {
        if (!instance) return;

        const loadDoctors = async () => {
            const res = await getVerifiedDoctors();

            const profilesData = await Promise.all(
                res.map(async (addr: string) => {
                    const profile = await getDoctorProfile(addr);
                    return { ...profile, wallet: addr };
                })
            );

            setProfiles(profilesData);
        };

        loadDoctors();
    }, [instance]);

    const handleAssignDoctor = async (doctor: string) => {
        await assignDoctor(Number(reportId), doctor);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Manage Access
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage Access Permissions</DialogTitle>
                </DialogHeader>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                    <strong>Granular Access Control:</strong> You can grant access to
                    specific doctors or all doctors with a particular specialization.
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Authorize Specific Doctors
                    </h3>

                    {profiles.length === 0 ? (
                        <p className="text-sm text-gray-500">No verified doctors available.</p>
                    ) : (
                        profiles.map((profile) => (
                            <div
                                key={profile.wallet}
                                className="flex items-start justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="font-medium">Dr. {profile.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Experience: {profile.experience} years
                                        </p>
                                        <div className="mt-2 flex gap-2 text-xs">
                                            <span className="rounded-md bg-gray-100 px-2 py-1">
                                                {profile.specialization}
                                            </span>
                                            <span className="rounded-md bg-gray-100 px-2 py-1">
                                                {profile.qualification}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Checkbox
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            handleAssignDoctor(profile.wallet);
                                        }
                                    }}
                                    className="
                                        border-2 border-gray-400
                                        data-[state=checked]:border-blue-600
                                        data-[state=checked]:bg-blue-600
                                        data-[state=checked]:text-white
                                    "
                                />
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
