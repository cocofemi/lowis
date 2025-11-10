"use client";

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

interface CertificateTemplateProps {
  certificate: Certificate;
  companyName?: string;
  directorName?: string;
  directorPosition?: string;
}

export function CertificateTemplate({
  certificate,
  companyName = "Kervah",
  directorName = "Director",
  directorPosition = "Chief Learning Officer",
}: CertificateTemplateProps) {
  const completionDate = new Date(certificate.completionDate);

  return (
    <div className="flex justify-center p-8">
      <div
        className="w-full max-w-4xl bg-white p-16 relative"
        style={{ aspectRatio: "16/12" }}
      >
        <div
          className="absolute inset-0 border-8"
          style={{ borderColor: "#d4af37" }}
        >
          {/* Top-left corner decoration */}
          <div
            className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2"
            style={{ borderColor: "#d4af37" }}
          ></div>
          {/* Top-right corner decoration */}
          <div
            className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2"
            style={{ borderColor: "#d4af37" }}
          ></div>
          {/* Bottom-left corner decoration */}
          <div
            className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2"
            style={{ borderColor: "#d4af37" }}
          ></div>
          {/* Bottom-right corner decoration */}
          <div
            className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2"
            style={{ borderColor: "#d4af37" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between text-center">
          {/* Header */}
          <div className="space-y-1">
            <p
              className="text-2xl italic"
              style={{ fontFamily: "Georgia, serif", color: "#333" }}
            >
              {companyName}
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: "Georgia, serif", color: "#666" }}
            >
              The Course or Training Module Name
            </p>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1
              className="text-6xl font-bold tracking-wider"
              style={{
                fontFamily: "Georgia, serif",
                color: "#000",
                letterSpacing: "0.15em",
              }}
            >
              CERTIFICATE
            </h1>
            <h2
              className="text-5xl font-bold tracking-wider"
              style={{
                fontFamily: "Georgia, serif",
                color: "#000",
                letterSpacing: "0.1em",
              }}
            >
              OF COMPLETION
            </h2>
            <div className="flex justify-center">
              <div
                className="w-32 h-1"
                style={{ backgroundColor: "#d4af37" }}
              ></div>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-4">
            <p
              className="text-lg"
              style={{ fontFamily: "Georgia, serif", color: "#333" }}
            >
              Our company is pleased
              <br />
              to be able to award this certificate to
            </p>

            {/* Member Name */}
            <div className="space-y-2">
              <p
                className="text-4xl italic font-light"
                style={{ fontFamily: "Georgia, serif", color: "#000" }}
              >
                {certificate.memberName}
              </p>
              <div className="flex justify-center">
                <div
                  className="w-64 border-b-2 border-dotted"
                  style={{ borderColor: "#d4af37" }}
                ></div>
              </div>
            </div>

            {/* Course Completion Text */}
            <p
              className="text-base"
              style={{ fontFamily: "Georgia, serif", color: "#333" }}
            >
              Upon the Successful Completion of Your Course Name,
              <br />
              Module, Level or Grade
            </p>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-end px-8 mt-2">
            {/* Date */}
            <div className="text-center">
              <p
                className="text-sm mb-2"
                style={{ fontFamily: "Georgia, serif", color: "#333" }}
              >
                {format(completionDate, "MMMM dd yyyy")}
              </p>
              <div
                className="w-32 border-b-2"
                style={{ borderColor: "#d4af37" }}
              ></div>
              <p
                className="text-xs italic mt-1"
                style={{ fontFamily: "Georgia, serif", color: "#666" }}
              >
                Date awarded
              </p>
            </div>

            {/* Seal/Badge */}
            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{
                  backgroundColor: "#d4af37",
                  border: "3px solid #8b7500",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-center">
                  <div className="text-lg">✓</div>
                  <div className="text-xs">Kervah</div>
                </div>
              </div>
            </div>

            {/* Director */}
            <div className="text-center">
              <div
                className="w-32 border-b-2 mb-2"
                style={{ borderColor: "#d4af37" }}
              ></div>
              <p
                className="text-sm italic"
                style={{ fontFamily: "Georgia, serif", color: "#333" }}
              >
                {directorName}
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: "Georgia, serif", color: "#666" }}
              >
                {directorPosition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
