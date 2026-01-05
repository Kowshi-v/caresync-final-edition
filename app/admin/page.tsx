"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, ShieldOff, ShieldX } from "lucide-react"
import { useContractHook } from "@/hooks/useContractHook"
import { useEffect, useState } from "react"
import { DoctorProfileWithWallet } from "@/types/doctor"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/navigation"

export default function DoctorsPage() {
    const { getAllDoctors, getDoctorProfile, instance } = useContractHook();
    const [profiles, setProfiles] = useState<DoctorProfileWithWallet[]>([]);

    useEffect(() => {
        if (!instance) return;

        const loadDoctors = async () => {
            const addresses = await getAllDoctors();

            const profilesData = await Promise.all(
                addresses.map(async (addr: string) => {
                    const profile = await getDoctorProfile(addr);
                    return {
                        ...profile,
                        wallet: addr,
                    };
                })
            );

            setProfiles(profilesData);
        };

        loadDoctors();
    }, [instance]);

    const verified = profiles.filter(p => p.verified);
    const unverified = profiles.filter(p => !p.verified);

    const router = useRouter();

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between items-center">
                    <h1 className="mb-6 text-3xl font-bold text-red-500 flex items-center gap-2">
                        <ArrowLeft className="h-6 w-6" onClick={() => router.back()} />
                        Doctors Directory
                    </h1>
                    <ConnectButton />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <h2 className="text-xl font-semibold text-green-700">
                                Verified Doctors
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {verified.map((doctor) => (
                                <DoctorCard
                                    key={doctor.wallet}
                                    doctor={doctor}
                                    verified
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <ShieldOff className="h-5 w-5 text-red-600" />
                            <h2 className="text-xl font-semibold text-red-700">
                                Unverified Doctors
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {unverified.map((doctor) => (
                                <DoctorCard
                                    key={doctor.wallet}
                                    doctor={doctor}
                                    verified={false}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function DoctorCard({
    doctor,
    verified,
}: {
    readonly doctor: DoctorProfileWithWallet,
    readonly verified: boolean
}) {
    const { verifyDoctor, revokeDoctor } = useContractHook();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        {doctor.name}
                    </CardTitle>
                    {
                        verified ? (
                            <Button className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
                                onClick={
                                    () => revokeDoctor(doctor.wallet)
                                }>
                                Revoke <ShieldX className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button className="bg-red-500 hover:bg-red-600 flex items-center gap-2" onClick={
                                () => verifyDoctor(doctor.wallet)
                            }>
                                verify <ShieldCheck className="h-4 w-4" />
                            </Button>
                        )
                    }
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">Experience: {doctor.experience}</p>

                <Separator />

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                        {doctor.specialization}
                    </Badge>
                    <Badge variant="outline">
                        Qualification: {doctor.qualification}
                    </Badge>
                </div>
            </CardContent>
        </Card >
    )
}
