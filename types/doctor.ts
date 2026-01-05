export interface DoctorProfile {
    experience: number;
    name: string;
    qualification: string;
    specialization: string;
    verified: boolean;
}

export interface DoctorProfileWithWallet extends DoctorProfile {
    wallet: string;
}