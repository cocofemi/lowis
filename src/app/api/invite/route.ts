import { Resend } from "resend"
import { OrganizationInviteEmail } from "@/emails/organization-invite"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, invitedByUsername, organizationName, inviteLink } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "hello@kervah.co.uk",
      to: [email],
      subject: `You've been invited to join ${organizationName}`,
      react: OrganizationInviteEmail({
        invitedByUsername,
        organizationName,
        inviteLink,
        recipientEmail: email,
      }),
    })

    if (error) {
      console.error("Resend API error:", error)
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ data })
  } catch (error) {
    console.error("Server error:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
