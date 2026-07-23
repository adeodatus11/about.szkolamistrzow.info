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
  title: "ZSZ nr 5 we Wrocławiu | Szkoła Mistrzów",
  description:
    "Dwujęzyczna, krótka prezentacja Zespołu Szkół Zawodowych nr 5 we Wrocławiu: tradycja, praktyka, pracownie i projekty.",
  openGraph: {
    title: "ZSZ nr 5 we Wrocławiu | Szkoła Mistrzów",
    description:
      "Poznaj szkołę, w której zawód staje się przyszłością.",
    images: ["/photos/hero-mural.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
