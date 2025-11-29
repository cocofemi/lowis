"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { Certificate } from "@/types/index.types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CertificateTemplate } from "./certificate-template";
import { useState } from "react";

interface CertificatesTableProps {
  certificates: Certificate[];
  onViewCertificate: (certificate: Certificate) => void;
}

export function CertificatesTable({
  certificates,
  onViewCertificate,
}: CertificatesTableProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate>();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return <Badge className="bg-green-500/20 text-green-700">Issued</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700">Pending</Badge>
        );
      case "revoked":
        return <Badge className="bg-red-500/20 text-red-700">Revoked</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const downloadPng = async (certificateId: string) => {
    const element = document.getElementById(`certificate-${certificateId}`);
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#ffffff",
    });
    const dataUrl = canvas.toDataURL("image/png");

    // Trigger download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${certificateId}.png`;
    link.click();
  };

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Certificate #</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No certificates have been issued yet. Completed a course to
                  view available certificates
                </TableCell>
              </TableRow>
            )}
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{`${cert?.user?.fname} ${cert?.user?.lname}`}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {cert?.user?.email}
                </TableCell>
                <TableCell>{cert?.course?.title}</TableCell>
                <TableCell className="font-mono text-sm uppercase">
                  {cert?.certificateId}
                </TableCell>
                <TableCell>
                  {format(new Date(Number(cert?.issueDate)), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(cert.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewCertificate(cert)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        downloadPng(cert?.certificateId);
                        setSelectedCertificate(cert);
                        console.log("sdjjs");
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: "none" }}>
        {selectedCertificate && (
          <CertificateTemplate certificate={selectedCertificate} />
        )}
      </div>
    </>
  );
}
