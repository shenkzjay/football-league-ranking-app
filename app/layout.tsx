import type { Metadata } from "next";
import localFont from "next/font/local";
import { Courgette } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
// import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import Final from "@/public/imgs/final.jpeg";
import Link from "next/link";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${courgette.variable}   antialiased bg-[#f7f8fa] max-h-full relative`}>
          <section className=" ">
            <section className="">
              <main>{children}</main>
            </section>
            {/* <Analytics /> */}
          </section>
        </body>
      </html>
    </Provider>
  );
}
