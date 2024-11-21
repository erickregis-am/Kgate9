import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const geistRobotoRegular = localFont({
  src: "./fonts/Roboto-Regular.ttf",
  variable: "--font-geist-roboto-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KGATE9",
  description: "plataforma de cancela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistRobotoRegular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
