import { Link } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export default function InviteExpiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>
            {/* Expired Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <CardTitle>
              <h1 className="text-2xl font-bold text-black text-center mb-3">
                Invitation Link Expired
              </h1>
            </CardTitle>
            {/* Description */}
            <p className="text-zinc-400 mb-6 leading-relaxed">
              This invitation link has expired or is no longer valid. Invitation
              links typically expire after 7 days for security reasons.
            </p>
            {/* Possible Reasons */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-white mb-2">
                This could happen if:
              </h3>
              <ul className="text-sm text-zinc-400 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>The invitation has expired (older than 7 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>The invitation was revoked by an administrator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>You have already accepted this invitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>The link was copied incorrectly</span>
                </li>
              </ul>
            </div>
            {/* Next Steps */}
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                Please contact your administrator to request a new invitation
                link.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="mailto:support@lowis.com"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Support
                </a>

                <a
                  href="http://localhost:3000"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Return to Homepage
                </a>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
