import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryClientProvider from "@/provider/ReactQueryClientProvider";
import GuestGuard from "@/guard/GuestGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UI",
  description: "This is a home page",
};

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Toaster />
        <GuestGuard>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </GuestGuard>
      </body>
    </html>
  );
}
