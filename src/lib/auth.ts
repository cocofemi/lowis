import { cookies } from "next/headers";
import { jwtVerify } from "jose";

interface SessionPayload {
  token: string;
  user: {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    businesses: {
      id: string;
      name: string;
      role: "admin" | "member | super-admin";
    }[];
  };
  activeBusinessId: string;
  activeBusinessName: string
  activeBusinessRole: string
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return null;

    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

    const { payload } = await jwtVerify(session, secret);

    return payload as unknown as SessionPayload;;
  } catch (err) {
    console.error("Invalid session:", err);
    return null;
  }
}


