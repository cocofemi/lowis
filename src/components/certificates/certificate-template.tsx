"use client";

import { Certificate } from "@/types/index.types";
import { format } from "date-fns";

interface CertificateTemplateProps {
  certificate: Certificate;
}

export function CertificateTemplate({ certificate }: CertificateTemplateProps) {
  const completionDate = new Date(Number(certificate?.issueDate));
  const courseName = certificate?.course?.title;

  return (
    <div
      id={`certificate-${certificate.certificateId}`}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        background: "#ffffff",
        all: "unset",
      }}
    >
      <div
        style={{
          width: "900px",
          background: "#ffffff",
          padding: "60px",
          position: "relative",
          border: "8px solid #d4af37",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Decorative Corners */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            width: "40px",
            height: "40px",
            borderTop: "3px solid #d4af37",
            borderLeft: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "40px",
            height: "40px",
            borderTop: "3px solid #d4af37",
            borderRight: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            width: "40px",
            height: "40px",
            borderBottom: "3px solid #d4af37",
            borderLeft: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            width: "40px",
            height: "40px",
            borderBottom: "3px solid #d4af37",
            borderRight: "3px solid #d4af37",
          }}
        />

        {/* Company / Course */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "22px", fontStyle: "italic", color: "#444" }}>
            Kervah Learning Institute
          </p>
          <p style={{ fontSize: "16px", color: "#666" }}>{courseName}</p>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "50px", fontWeight: "bold", margin: 0 }}>
            CERTIFICATE
          </h1>
          <h2
            style={{ fontSize: "36px", marginTop: "10px", fontWeight: "bold" }}
          >
            OF COMPLETION
          </h2>
          <div
            style={{
              width: "120px",
              height: "5px",
              backgroundColor: "#d4af37",
              margin: "20px auto 0",
            }}
          />
        </div>

        {/* Recipient */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "18px", color: "#444" }}>
            This certificate is proudly awarded to
          </p>

          <p
            style={{
              fontSize: "36px",
              fontStyle: "italic",
              margin: "10px 0",
            }}
          >
            {certificate?.user?.fname} {certificate?.user?.lname}
          </p>

          <div
            style={{
              width: "280px",
              borderBottom: "2px dotted #d4af37",
              margin: "0 auto",
            }}
          />

          <p style={{ marginTop: "20px", color: "#444" }}>
            For successfully completing the course:
            <span style={{ fontWeight: "bold" }}> {courseName}</span>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          {/* Date */}
          <div style={{ textAlign: "center" }}>
            <p>{format(completionDate, "MMMM dd, yyyy")}</p>
            <div
              style={{
                width: "160px",
                borderBottom: "2px solid #d4af37",
                marginTop: "4px",
              }}
            />
            <p style={{ fontSize: "12px", marginTop: "6px", color: "#666" }}>
              Date awarded
            </p>
          </div>

          {/* Seal */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#d4af37",
                border: "4px solid #c1962c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              }}
            >
              ✓
            </div>
          </div>

          {/* Signature */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "160px",
                borderBottom: "2px solid #d4af37",
              }}
            />
            <p
              style={{
                marginTop: "8px",
                fontStyle: "italic",
                color: "#333",
              }}
            >
              Director
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              Chief Learning Officer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
