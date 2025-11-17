import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
  Preview,
} from "@react-email/components";

interface WelcomeEmailProps {
  fname?: string;
}

export function WelcomeEmail({ fname }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Kervah</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://your-domain.com/uidux-logo-black-circle.jpg"
              width="40"
              height="40"
              alt="kervah Logo"
              style={logo}
            />
          </Section>

          <Section style={nav}>
            <Link href="https://your-domain.com" style={navLink}>
              Home
            </Link>
            <Link href="https://facebook.com" style={socialIcon}>
              <Img
                src="https://your-domain.com/facebook-icon.png"
                width="20"
                height="20"
                alt="Facebook"
              />
            </Link>
            <Link href="https://twitter.com" style={socialIcon}>
              <Img
                src="https://your-domain.com/twitter-icon.png"
                width="20"
                height="20"
                alt="Twitter"
              />
            </Link>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {fname},</Text>
            <Text style={paragraph}>
              Welcome to Kervah! We're thrilled to have you join our learning
              platform.
            </Text>
            <Text style={paragraph}>
              Your account has been successfully created and you're all set to
              get started. Explore our platform and discover everything we have
              to offer.
            </Text>
            <Section style={buttonContainer}>
              <Link href="https://your-domain.com/dashboard" style={button}>
                Get Started
              </Link>
            </Section>
            <Text style={paragraph}>
              If you have any questions or need assistance, feel free to reach
              out to our support team.
            </Text>
            <Text style={signature}>
              Keep making awesome stuff!
              <br />
              Kervah ❤️
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Img
              src="https://your-domain.com/uidux-logo-black-circle.jpg"
              width="32"
              height="32"
              alt="kervah Logo"
              style={footerLogo}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

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
  padding: "40px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "16px",
};

const logo = {
  display: "block",
};

const nav = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const navLink = {
  color: "#000000",
  fontSize: "14px",
  textDecoration: "none",
  marginRight: "12px",
};

const socialIcon = {
  display: "inline-block",
  marginLeft: "12px",
};

const content = {
  marginBottom: "32px",
};

const greeting = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000",
  margin: "0 0 16px 0",
};

const buttonContainer = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000000",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
  borderRadius: "6px",
};

const signature = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000",
  margin: "24px 0 0 0",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  textAlign: "center" as const,
  paddingTop: "16px",
};

const footerLogo = {
  display: "inline-block",
  margin: "0 auto",
};
