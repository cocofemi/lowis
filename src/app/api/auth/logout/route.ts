import { NextResponse } from "next/server";

export async function POST() {
    const headers = new Headers();
    headers.append("Set-Cookie",  `token=; Path=/; Max-Age=0; SameSite=Lax`)
    headers.append("Set-Cookie",  `activeBusiness=; Path=/; Max-Age=0; SameSite=Lax`)
    headers.append("Set-Cookie",  `activeRole=; Path=/; Max-Age=0; SameSite=Lax`)
    headers.append("Set-Cookie",  `session=; Path=/; Max-Age=0; SameSite=Lax`)
    
  return NextResponse.json(
    { ok: true },
    {
      headers
    }
  );
}
