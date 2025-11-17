import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { VerificationCodeEmail } from "@/emails/verification-email"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email, verificationCode, fname } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "hello@kervah.co.uk",
      to: email,
      subject: "Your Verification Code",
      react: VerificationCodeEmail({ verificationCode, fname }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json(
      {data},
      {
        status: 200,
        headers: {
            "Set-Cookie": `emailVerification=${email}; Path=/; Max-Age=600; SameSite=Lax`,
        },
      }
    )
  } catch (error) {
  console.log(error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
