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

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <div className={`${courgette.variable}   antialiased bg-[#f7f8fa] max-h-full relative`}>
        <nav className="bg-white ">
          <div className="mx-auto w-[90vw] py-6 flex flex-row justify-between ">
            <div>LOGO</div>
            <ul className="flex flex-row gap-8 text-sm font-semibold">
              <li>Home</li>
              <li>Competition</li>
              <li>Player statistics</li>
              <li>Betting</li>
              <li>Marketplace</li>
            </ul>
            <Link href={"/admin"}>Login</Link>
          </div>
        </nav>
        <section className="mx-auto w-[90vw] ">
          <div className="grid grid-cols-[200px,auto,350px] gap-6 text-xl font-semibold">
            <h2 className="py-6"></h2>
            <h2 className="py-6">Football for you</h2>
            <span className="py-6 flex justify-between items-center">
              <h4>Latest news</h4>
              <p className="text-xs">see all →</p>
            </span>
          </div>
          <section className="grid grid-cols-[200px,auto,350px] gap-6">
            <aside className="sticky top-4 h-[100vh] overflow-y-scroll">
              <div className="flex flex-col mb-6 bg-white rounded-2xl p-4 gap-2 text-sm">
                <span className="flex border w-12 h-12 rounded-full bg-[#f7f8fa]"></span>
                <p>By - Olajide seun</p>
              </div>
              <div className=" bg-white h-full  rounded-2xl p-4">
                <h2 className="text-xl font-semibold">Seasons</h2>
                <ul className=" gap-4 flex flex-col mt-2">
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                  <li>2025</li>
                </ul>
              </div>
            </aside>

            <main>{children}</main>
            <aside className=" h-[100vh]">
              <div className="p-2 rounded-2xl bg-white sticky top-4 overflow-y-scroll  ">
                <Image
                  src={Final}
                  width={500}
                  height={100}
                  quality={80}
                  priority
                  alt="image of winners showcasing their medals"
                  className="w-full md:h-[20vh] h-[40vh] object-cover object-[0,-100px] relative rounded-2xl"
                />
                <div className="flex justify-between py-2 px-4 items-center text-xs">
                  <div>
                    <span className="flex px-1 py-1 bg-[#f7f8fa] rounded-xl text-xs">
                      <p>sports</p>
                    </span>
                  </div>

                  <div className="space-x-6">
                    <span>view</span>
                    <span>like</span>
                    <span>share</span>
                  </div>
                </div>

                <div className="px-4">
                  <h4 className="text-sm font-semibold w-full">
                    Intelligence Committee to begin circulating dragt Ukraine report Monday
                  </h4>
                </div>
              </div>
            </aside>
          </section>
          {/* <Analytics /> */}
        </section>
      </div>
    </Provider>
  );
}
