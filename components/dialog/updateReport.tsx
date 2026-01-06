"use client";

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
import { useContractHook } from "@/hooks/useContractHook"
import { usePinataHook } from "@/hooks/usePinataHook";
import { useState } from "react";

export function UpdateReport({ reportId }: { readonly reportId: number }) {
    const { updateReport } = useContractHook();
    const { IpfsUpload } = usePinataHook();
    const [cid, setCid] = useState<string>("");
    const [meta, setMeta] = useState<string>("");

    const handleUpload = async (file: File | null) => {
        if (!file) {
            return;
        }
        const res = await IpfsUpload(file);
        setCid(res?.IpfsHash!);
    };

    const handleSubmit = async () => {
        if (cid) {
            await updateReport(reportId, cid, meta);
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild >
                    <Button className="bg-red-600 hover:bg-red-700 text-white mr-4 transition">
                        Update Report
                    </Button>
                </DialogTrigger>
                < DialogContent className="sm:max-w-[725px]" >
                    <DialogHeader>
                        <DialogTitle>Edit Report</DialogTitle>
                        <DialogDescription>
                            Make changes to patient report here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    < div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="file-1">Upload Edited Report</Label>
                            <Input id="file-1" name="file" type="file" onChange={(e) => handleUpload(e.target.files?.[0] || null)} />
                        </div>
                        <div className="grid gap-3">
                            <textarea rows={10} cols={5} className="p-3 border border-gray-200 rounded-b-xl" onChange={(e) => setMeta(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild >
                            <Button variant="outline" > Cancel </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600"> Save changes </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
