"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, ShieldOff } from "lucide-react"

type Doctor = {
    id: string
    name: string
    email: string
    specialization: string
    license: string
}

const verifiedDoctors: Doctor[] = [
    {
        id: "1",
        name: "Dr. CDS",
        email: "csa@gmail.com",
        specialization: "Dermatology",
        license: "LIC-2345",
    },
    {
        id: "2",
        name: "Dr. Kumar",
        email: "kumar@gmail.com",
        specialization: "Cardiology",
        license: "LIC-9898",
    },
]

const unverifiedDoctors: Doctor[] = [
    {
        id: "3",
        name: "Dr. Alex",
        email: "alex@gmail.com",
        specialization: "Neurology",
        license: "LIC-1122",
    },
]

export default function DoctorsPage() {
    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-6 text-3xl font-bold">
                    Doctors Directory
                </h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* VERIFIED DOCTORS */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <h2 className="text-xl font-semibold text-green-700">
                                Verified Doctors
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {verifiedDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    verified
                                />
                            ))}
                        </div>
                    </section>

                    {/* UNVERIFIED DOCTORS */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <ShieldOff className="h-5 w-5 text-red-600" />
                            <h2 className="text-xl font-semibold text-red-700">
                                Unverified Doctors
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {unverifiedDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    verified={false}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

function DoctorCard({
    doctor,
    verified,
}: {
    doctor: Doctor
    verified: boolean
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        {doctor.name}
                    </CardTitle>
                    <Badge variant={verified ? "default" : "destructive"}>
                        {verified ? "Verified" : "Unverified"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{doctor.email}</p>

                <Separator />

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                        {doctor.specialization}
                    </Badge>
                    <Badge variant="outline">
                        License: {doctor.license}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
