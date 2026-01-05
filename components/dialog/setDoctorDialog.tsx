"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useContractHook } from "@/hooks/useContractHook";

export function SetDoctorDialog() {
    const { registerAsDoctor, setDoctorProfile } = useContractHook();
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        qualification: "",
        specialization: "",
        experience: 0,
    });

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" flex items-center gap-3 w-full border-red-600 text-red-600 hover:bg-red-50 mt-6">
                        <span>Continue as Doctor</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-137.5">
                    <DialogHeader>
                        <DialogTitle className="text-red-500">Your Career</DialogTitle>
                        <DialogDescription >
                            Update your personal information and career details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1" className="text-red-500">Name</Label>
                            <Input id="name-1" name="name" defaultValue={formData.name} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="qualification-1" className="text-red-500">Qualification</Label>
                            <Input id="qualification-1" name="qualification" defaultValue={formData.qualification} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    qualification: e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="specialization-1" className="text-red-500">Specialization</Label>
                            <Input id="specialization-1" name="specialization" defaultValue={formData.specialization} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    specialization: e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="experience-1" className="text-red-500">Experience</Label>
                            <Input id="experience-1" name="experience" defaultValue={formData.experience} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    experience: Number(e.target.value)
                                })
                            }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className="bg-red-500 hover:bg-red-600" disabled={isRegistered} onClick={() => {
                            registerAsDoctor(setIsRegistered)
                        }}>Register As Doctor</Button>
                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => {
                            setDoctorProfile(isRegistered, formData.name, formData.qualification, formData.specialization, formData.experience)
                        }}>set Profile</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}
