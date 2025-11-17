import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const headers = new Headers();
    headers.append("Set-Cookie", `resetSession=; Path=/; Max-Age=0`), // remove old session
    headers.append("Set-Cookie", `verifiedReset=${email}; Path=/; Max-Age=600; SameSite=Lax`)
  
  return NextResponse.json(
    { ok: true },
    {
      headers
    }
  );
}
