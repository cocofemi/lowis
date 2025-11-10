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

interface Certificate {
  id: string;
  memberName: string;
  memberEmail: string;
  courseName: string;
  completionDate: string;
  certificateNumber: string;
  status: "issued" | "pending" | "revoked";
}

interface CertificatesTableProps {
  certificates: Certificate[];
  onViewCertificate: (certificate: Certificate) => void;
}

export function CertificatesTable({
  certificates,
  onViewCertificate,
}: CertificatesTableProps) {
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

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Certificate #</TableHead>
            <TableHead>Completion Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell className="font-medium">{cert.memberName}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {cert.memberEmail}
              </TableCell>
              <TableCell>{cert.courseName}</TableCell>
              <TableCell className="font-mono text-sm">
                {cert.certificateNumber}
              </TableCell>
              <TableCell>
                {format(new Date(cert.completionDate), "MMM dd, yyyy")}
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
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
