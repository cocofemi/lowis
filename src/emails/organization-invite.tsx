import {
  Body,
  Button,
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

interface OrganizationInviteEmailProps {
  invitedByUsername?: string;
  organizationName?: string;
  inviteLink?: string;
  recipientEmail?: string;
}

export const OrganizationInviteEmail = ({
  invitedByUsername = "Sarah Chen",
  organizationName = "Acme Inc",
  inviteLink = "http://localhost:3000/invite/accept",
  recipientEmail = "user@example.com",
}: OrganizationInviteEmailProps) => (
  <Html>
    <Head />
    <Preview>
      {invitedByUsername} invited you to join {organizationName}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with logo and navigation */}
        <Section style={header}>
          <Img
            src="/kervah-logo-black-circle.jpg"
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
          <Heading as="h1" style={heading}>
            You've been invited!
          </Heading>

          <Text style={paragraph}>
            <strong>{invitedByUsername}</strong> has invited you to join{" "}
            <strong>{organizationName}</strong> on kervah.
          </Text>

          <Text style={paragraph}>
            By joining this organization, you'll be able to participate in
            courses, gain learning materials, and work together with the team.
          </Text>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Button href={inviteLink} style={button}>
              Accept Invitation
            </Button>
          </Section>

          <Text style={linkText}>
            Or copy and paste this link in your browser:
            <br />
            <Link href={inviteLink} style={link}>
              {inviteLink}
            </Link>
          </Text>

          <Section style={divider} />

          {/* Security notice */}
          <Text style={securityText}>
            This invitation was sent to <strong>{recipientEmail}</strong>. If
            you didn't expect this invitation or don't want to join this
            organization, you can safely ignore this email.
          </Text>
        </Section>

        {/* Footer logo */}
        <Section style={footer}>
          <Img
            src="/kervah-logo-black-circle.jpg"
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

export { OrganizationInviteEmail as OrganizationInvite };

export default OrganizationInviteEmail;

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
  padding: "40px 40px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1f2937",
  marginBottom: "24px",
  lineHeight: "32px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
  marginBottom: "20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const linkText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#6b7280",
  marginBottom: "32px",
  textAlign: "center" as const,
};

const link = {
  color: "#2563eb",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const securityText = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#6b7280",
  marginTop: "24px",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  borderLeft: "3px solid #d1d5db",
};

const footer = {
  padding: "32px 40px",
  textAlign: "center" as const,
  borderTop: "1px solid #f3f4f6",
};
