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
import { toast } from "sonner";

export function UploadFileDialog({ setIpfsHash }: { readonly setIpfsHash: React.Dispatch<React.SetStateAction<string>> }) {
    const { IpfsUpload } = usePinataHook();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        const res = await IpfsUpload(file);
        if (res?.IpfsHash) {
            setIpfsHash(res.IpfsHash);
            toast.success("File uploaded successfully!");
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