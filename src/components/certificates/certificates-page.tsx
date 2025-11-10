"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CertificatesTable } from "@/components/certificates/certificates-table";
import { CertificatePreviewModal } from "@/components/certificates/certificate-preview-modal";

interface Certificate {
  id: string;
  memberName: string;
  memberEmail: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  status: "issued" | "pending" | "revoked";
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    memberName: "John Doe",
    memberEmail: "john@example.com",
    courseName: "Domestic Abuse: Learn",
    completionDate: "2024-10-15",
    certificateNumber: "CERT-2024-001",
    status: "issued",
  },
  {
    id: "2",
    memberName: "Jane Smith",
    memberEmail: "jane@example.com",
    courseName: "Mental Health: First Aid",
    completionDate: "2024-10-10",
    certificateNumber: "CERT-2024-002",
    status: "issued",
  },
  {
    id: "3",
    memberName: "Mike Johnson",
    memberEmail: "mike@example.com",
    courseName: "Domestic Abuse: Learn",
    completionDate: "2024-10-05",
    certificateNumber: "CERT-2024-003",
    status: "issued",
  },
  {
    id: "4",
    memberName: "Sarah Williams",
    memberEmail: "sarah@example.com",
    courseName: "Crisis Intervention",
    completionDate: "2024-09-28",
    certificateNumber: "CERT-2024-004",
    status: "pending",
  },
];

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">
            Manage and view issued certifications
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issued Certificates</CardTitle>
          <CardDescription>
            View all certificates issued to members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificatesTable
            certificates={mockCertificates}
            onViewCertificate={handleViewCertificate}
          />
        </CardContent>
      </Card>

      {selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
