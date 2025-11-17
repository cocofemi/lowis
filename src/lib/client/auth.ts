"use client";

import {jwtDecode} from "jwt-decode";

export interface SessionPayload {
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


export function getTokenFromSessionCookie() {
  const session = document.cookie
    .split("; ")
    .find((c) => c.startsWith("session="))
    ?.split("=")[1];

  if (!session) return null;

  console.log(session)

  try {
    const decoded = jwtDecode<SessionPayload>(session); 
    console.log("decoded", decoded)
    return decoded.token;
  } catch (e) {
    console.error("Failed to decode session cookie:", e);
    return null;
  }
}

