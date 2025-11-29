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
import { useQuery } from "@apollo/client/react";
import { GET_USER_CERTIFICATES } from "@/app/graphql/queries/certificate/certificate.queries";
import { Spinner } from "../ui/spinner";
import { Certificate } from "@/types/index.types";

interface Props {
  organisationId: string;
}

export default function CertificatesPage({ organisationId }: Props) {
  const { data, loading } = useQuery<{ certificatesByUser: Certificate[] }>(
    GET_USER_CERTIFICATES,
    {
      variables: { businessId: organisationId },
    }
  );

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsPreviewOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading certificates...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">View issued certifications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issued Certificates</CardTitle>
          <CardDescription>
            View all certificates issued for completed courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificatesTable
            certificates={data?.certificatesByUser}
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
