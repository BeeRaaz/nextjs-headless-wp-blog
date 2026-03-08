import type { Metadata } from "next";
import { Xanh_Mono, Plus_Jakarta_Sans, Gasoek_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

const xanhMono = Xanh_Mono({
  variable: "--font-xanh-mono",
  weight: "400",
  subsets: ["latin"],
});

const gasoekOne = Gasoek_One({
  variable: "--font-gasoek-one",
  weight: "400",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Stories and photos of long walks, wrong turns, and everyday discoveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${xanhMono.variable} ${gasoekOne.variable} ${plusJakartaSans.variable} antialiased min-w-80 font-jakarta`}
      >
        <div className="w-full relative overflow-clip">
          <Header />
          <div className="lg:flex">
            <Sidebar />
            <main className="lg:flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
