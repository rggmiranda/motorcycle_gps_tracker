import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Provider from "./api/auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moto GPS tracking portal",
  description: "Moto GPS tracking portal",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar></Navbar>
          <div className="p-4">
          <Theme>{children}</Theme>
          </div>
        </Provider>
      </body>
    </html>
  );
}
