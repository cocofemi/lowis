import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  const body = await req.json();

  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

  const session = await new SignJWT(body)
     .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);


  return NextResponse.json(
    { success: true },
   {
      headers: {
        "Set-Cookie": `session=${session}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=86400`, // 7 days
      },
    }
  );
}
