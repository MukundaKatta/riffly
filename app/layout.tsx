import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riffly — Sing it in anyone's voice.",
  description:
    "Covers, duets, parodies. Generate studio-quality vocals from your favorite artists — ethically licensed.",
  openGraph: {
    title: "Riffly — Sing it in anyone's voice.",
    description:
      "Covers, duets, parodies. Generate studio-quality vocals from your favorite artists — ethically licensed.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Riffly&accent=purple&category=Consumer%20AI",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Riffly&accent=purple&category=Consumer%20AI",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
