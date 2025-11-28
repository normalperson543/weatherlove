import type { Metadata } from "next";
import { jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import Header from "@/components/header";
import LayoutWrapper from "@/components/wrapper";

export const metadata: Metadata = {
  title: "Weatherlove",
  description: "A minimal and clean weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${jetbrainsMono.variable} antialiased w-full h-full`}>
        <LayoutWrapper>
          <Header />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
