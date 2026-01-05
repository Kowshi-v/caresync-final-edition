import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, User } from "lucide-react"

export function AssignDoctorDialog() {
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
                    <p className="text-sm text-muted-foreground">
                        Control who can view your medical record:
                        <span className="font-medium">
                            PC-BCS702LAB updated.pdf
                        </span>
                    </p>
                </DialogHeader>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                    <strong>Granular Access Control:</strong> You can grant access to
                    specific doctors or all doctors with a particular specialization.
                    Doctors will only have view-only access — they cannot download,
                    screenshot, or edit your records.
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Authorize Specific Doctors
                    </h3>

                    <div className="flex items-start gap-3 rounded-lg border p-4">
                        <Checkbox id="doctor-1" defaultChecked />

                        <div className="flex-1">
                            <p className="font-medium">cds</p>
                            <p className="text-sm text-muted-foreground">
                                csa@gmail.com
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                <span className="rounded-md bg-gray-100 px-2 py-1">
                                    Dermatology
                                </span>
                                <span className="rounded-md bg-gray-100 px-2 py-1">
                                    csvdvd
                                </span>
                                <span className="rounded-md bg-gray-100 px-2 py-1">
                                    License: dwdwdw
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
