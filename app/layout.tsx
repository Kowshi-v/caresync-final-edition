import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RainbowKitProviderWrapper } from "@/provider/rainbow-provider";
import { Toaster } from "@/components/ui/sonner";
import RoleRedirectGuard from "@/navigation/role-navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Sync",
  description: "Secure, Blockchain-Powered Healthcare Records Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <RainbowKitProviderWrapper>
          <RoleRedirectGuard>
            {children}
          </RoleRedirectGuard>
        </RainbowKitProviderWrapper>
      </body>
    </html>
  );
}
