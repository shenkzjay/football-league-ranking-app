import type { Metadata } from "next";
import localFont from "next/font/local";
import { Courgette } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Analytics } from "@vercel/analytics/react";

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

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-courgette",
});

export const metadata: Metadata = {
  title: "City United Club",
  description: "City united football club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body
          className={`${courgette.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </Provider>
  );
}
