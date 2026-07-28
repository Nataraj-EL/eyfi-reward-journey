import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EYFI Campus Ambassador Network - Earn Your First Income",
  description: "Join India's first student income challenge. Build campus communities, host challenges, and unlock exclusive rewards, paid internships, and allocations.",
  openGraph: {
    title: "EYFI Campus Ambassador Network - Earn Your First Income",
    description: "Join India's first student income challenge. Build campus communities, host challenges, and unlock exclusive rewards.",
    type: "website",
    locale: "en_IN",
    siteName: "EYFI Reward Journey",
  },
  twitter: {
    card: "summary_large_image",
    title: "EYFI Campus Ambassador Network",
    description: "Join India's first student income challenge. Build campus communities, host challenges, and unlock exclusive rewards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
