"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CertificateTemplate } from "./certificate-template";
import { Download } from "lucide-react";

interface Certificate {
  id: string;
  memberName: string;
  memberEmail: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  status: "issued" | "pending" | "revoked";
}

interface CertificatePreviewModalProps {
  certificate: Certificate;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificatePreviewModal({
  certificate,
  isOpen,
  onClose,
}: CertificatePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-fit">
        <DialogHeader>
          <DialogTitle>Certificate Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CertificateTemplate certificate={certificate} />
          <div className="flex justify-end gap-2 mt-10">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
