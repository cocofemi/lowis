"use client";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/apollo-client";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
