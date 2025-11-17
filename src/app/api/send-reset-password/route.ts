import { Resend } from "resend"
import { ResetPasswordEmail } from "@/emails/reset-password"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, otpCode } = await req.json()

    const { data, error } = await resend.emails.send({
      from: "hello@kervah.co.uk",
      to: [email],
      subject: "Reset Your Password - OTP Code",
      react: ResetPasswordEmail({ otpCode }),
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return Response.json({ error }, { status: 500 })
    }

    console.log("[v0] Reset password email sent:", data)
    return Response.json( { ok: true, data },
    {
      headers: {
        "Set-Cookie": `resetSession=${email}; Path=/; Max-Age=600; SameSite=Lax`
      }
    })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return Response.json({ error }, { status: 500 })
  }
}
