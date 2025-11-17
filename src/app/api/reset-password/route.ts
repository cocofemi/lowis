import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const headers = new Headers();

  headers.append("Set-Cookie", `resetSession=; Path=/; Max-Age=0; HttpOnly`);
  headers.append("Set-Cookie", `verifiedReset=; Path=/; Max-Age=0; HttpOnly`);

  return NextResponse.json(
    { ok: true },
    {
      headers
    }
  );
}
