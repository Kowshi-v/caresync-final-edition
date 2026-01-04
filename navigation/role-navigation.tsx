"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function RoleRedirectGuard({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const router = useRouter();
    const { isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) return;

        const role = localStorage.getItem("role");

        if (!role) return;

        if (role === "doctor") {
            router.replace("/doctor/dashboard");
        } else if (role === "patient") {
            router.replace("/patient/dashboard");
        } else {
            toast.error("Invalid role found");
        }
    }, [isConnected, router]);

    return (
        <>
            {children}
        </>
    )

}
