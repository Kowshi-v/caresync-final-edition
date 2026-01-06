//file or report which user updates
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
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
import { Upload } from "lucide-react"
import { usePinataHook } from '@/hooks/usePinataHook';
import { useContractHook } from "@/hooks/useContractHook";

export function UploadFileDialog() {
    const { IpfsUpload } = usePinataHook();
    const { uploadReport } = useContractHook();
    const [file, setFile] = useState<File | null>(null);
    const [meta, setMeta] = useState<string>("");

    const handleUpload = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        const res = await IpfsUpload(file);
        if (res?.IpfsHash) {
            await uploadReport(res?.IpfsHash, meta);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Record
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Choose a file to upload to IPFS
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Input
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />

                    <textarea rows={10} cols={5} className="p-3 border border-gray-200 rounded-b-xl" onChange={(e) => setMeta(e.target.value)} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleUpload}
                        disabled={!file}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}