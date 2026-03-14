import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Human Rights Association of India",
    default: "Human Rights Association of India (HRAOI)",
  },
  description:
    "The Human Rights Association of India (HRAOI) is dedicated to promoting human rights, justice, and social welfare across India.",
  keywords: [
    "Human Rights",
    "HRAOI",
    "NGO",
    "Social Welfare",
    "Justice",
    "India",
    "Human Rights Association",
  ],
  authors: [{ name: "HRAOI" }],
  creator: "HRAOI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hraoi.in/",
    siteName: "Human Rights Association of India",
    title: "Human Rights Association of India (HRAOI)",
    description:
      "The Human Rights Association of India (HRAOI) is dedicated to promoting human rights, justice, and social welfare across India.",
    images: [
      {
        url: "/images/Logo.jpg",
        width: 800,
        height: 600,
        alt: "HRAOI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Rights Association of India",
    description:
      "Dedicated to promoting human rights, justice, and social welfare across India.",
    images: ["/images/Logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/Logo.jpg" },
      { url: "/images/Logo.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/images/Logo.jpg", sizes: "32x32", type: "image/jpeg" },
    ],
    apple: [
      { url: "/images/Logo.jpg" },
    ],
  },
};

import ConditionalLayout from "@/components/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-secondary selection:text-white`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
