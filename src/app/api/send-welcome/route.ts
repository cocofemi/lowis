import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import WelcomeEmail from "@/emails/welcome-email"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { email, fname } = await req.json()

    console.log("[v0] Attempting to send welcome email to:", email, "for user:", fname)

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "hello@kervah.co.uk",
      to: email,
      subject: "Welcome to Kervah!",
      react: WelcomeEmail({ fname }),
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json(
      { success: true, data},
      {
        status: 200,
        headers: {
           "Set-Cookie": `emailVerification=; Path=/; Max-Age=0; SameSite=Lax`
        }
      }
    )
  
  } catch (error) {
    console.error("[v0] Error sending welcome email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
