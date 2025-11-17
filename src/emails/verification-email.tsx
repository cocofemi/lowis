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
import kervah from "../../public/Kervah.svg";

interface VerificationCodeEmailProps {
  verificationCode?: number;
  fname?: string;
}

export const VerificationCodeEmail = ({
  verificationCode,
  fname,
}: VerificationCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your verification code: {String(verificationCode)}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with logo and navigation */}
        <Section style={header}>
          <Img
            src="../../public/KervahLogo.png"
            width="32"
            height="32"
            alt="kervah"
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
          </Section>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Text style={greeting}>Hi {fname},</Text>
          <Text style={paragraph}>
            This is your one time verification code.
          </Text>

          {/* Verification code box */}
          <Section style={codeContainer}>
            <Heading as="h1" style={codeText}>
              {String(verificationCode).split("").join(" ")}
            </Heading>
          </Section>

          <Text style={paragraph}>
            This code is only active for the next 90 minutes. Once the code
            expires you will have to resubmit a request for a code.
          </Text>

          <Text style={signature}>
            Keep making awesome stuff!
            <br />
            Kervah❤️
          </Text>
        </Section>

        {/* Footer logo */}
        <Section style={footer}>
          <Img
            src="/kervah-logo-black-circle.jpg"
            width="32"
            height="32"
            alt="kervah_logo"
            style={logo}
          />
        </Section>
      </Container>
    </Body>
  </Html>
);

export { VerificationCodeEmail as VerificationCode };

export default VerificationCodeEmail;

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

const logoSection = {
  display: "inline-block",
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
