"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function PdfViewIframe({ url }: { readonly url: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" >
                    View Report
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Patient Report</DialogTitle>
                    <DialogDescription>
                        Report is shown below:
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full h-[60vh] border rounded-xl overflow-hidden">
                    <iframe
                        title="Patient Report"
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
