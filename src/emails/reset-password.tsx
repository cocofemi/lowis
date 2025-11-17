import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  otpCode?: string;
}

export const ResetPasswordEmail = ({ otpCode }: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password with this OTP: {otpCode}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with logo and navigation */}
        <Section style={header}>
          <Img
            src="/uidux-logo-black-circle.jpg"
            width="32"
            height="32"
            alt="Kervah"
            style={logo}
          />
          <Section style={navigation}>
            <Link href="#" style={navLink}>
              Home
            </Link>
            <Link href="#" style={socialLink}>
              <Img
                src="/facebook-icon.png"
                width="20"
                height="20"
                alt="Facebook"
              />
            </Link>
            <Link href="#" style={socialLink}>
              <Img
                src="/twitter-icon.png"
                width="20"
                height="20"
                alt="Twitter"
              />
            </Link>
            <Link href="#" style={socialLink}>
              <Img
                src="/stylized-apple-icon.png"
                width="20"
                height="20"
                alt="Apple"
              />
            </Link>
          </Section>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Text style={greeting}>Hi there,</Text>
          <Text style={paragraph}>
            We received a request to reset your password. Use the OTP code below
            to proceed.
          </Text>

          {/* OTP code box */}
          <Section style={codeContainer}>
            <Heading as="h1" style={codeText}>
              {String(otpCode).split("").join(" ")}
            </Heading>
          </Section>

          <Text style={paragraph}>
            This code will expire in 15 minutes. If you didn&apos;t request a
            password reset, you can safely ignore this email.
          </Text>

          <Text style={signature}>
            Keep making awesome stuff!
            <br />
            Kervah Team
          </Text>
        </Section>

        {/* Footer logo */}
        <Section style={footer}>
          <Img
            src="/uidux-logo-black-circle.jpg"
            width="32"
            height="32"
            alt="kervah"
            style={logo}
          />
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

// Styles
const main = {
  backgroundColor: "#e5e7eb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
};

const header = {
  padding: "32px 40px",
  borderBottom: "1px solid #f3f4f6",
};

const logo = {
  display: "block",
};

const navigation = {
  textAlign: "right" as const,
};

const navLink = {
  color: "#1f2937",
  fontSize: "14px",
  textDecoration: "none",
  marginRight: "4px",
};

const socialLink = {
  display: "inline-block",
  marginLeft: "8px",
};

const content = {
  padding: "32px 40px",
};

const greeting = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#1f2937",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#374151",
  marginBottom: "24px",
};

const codeContainer = {
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
  padding: "32px",
  textAlign: "center" as const,
  marginBottom: "24px",
};

const codeText = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "8px",
  color: "#1f2937",
  margin: "0",
};

const signature = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#374151",
  marginTop: "32px",
};

const footer = {
  padding: "32px 40px",
  textAlign: "center" as const,
  borderTop: "1px solid #f3f4f6",
};
