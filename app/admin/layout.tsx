import type { Metadata } from "next";
import "@/app/globals.css";
import { SideMenu } from "@/ui-components/sidemenu";
import Provider from "../provider";

export const metadata: Metadata = {
  title: "City club league",
  description: "A footbal table and fixtures app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <section className="h-full flex">
        <div className="w-[15rem] p-6 mt-10">
          <SideMenu />
        </div>
        <div className=" w-full h-screen border bg-[#eaeaea]">{children}</div>
      </section>
    </Provider>
  );
}
