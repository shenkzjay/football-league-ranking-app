import type { Metadata } from "next";
import "@/app/globals.css";
import Provider from "../provider";
import AuthServer from "./auth/authserver";

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
      <AuthServer>{children}</AuthServer>
    </Provider>
  );
}
