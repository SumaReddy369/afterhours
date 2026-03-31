import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AfterHours — real friends after work",
    template: "%s · AfterHours",
  },
  description:
    "Weekly pods for young professionals after a move—same ~6 people, one slot, six weeks. Real-world friendship through a steady rhythm—not endless swiping.",
  openGraph: {
    title: "AfterHours — real friends after work",
    description:
      "Small weekly pods for people in a new city. Six weeks. Safety-forward matching—not another crowded mixer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfterHours — real friends after work",
    description: "Weekly pods for young professionals in a new city. Six weeks. Same people, one slot.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body className={`${sourceSans.className} min-h-screen bg-ah-bg text-ah-ink antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
