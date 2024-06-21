import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "syepost",
  description: "Syepost - a platform for sharing thoughts and ideas. Write posts, comment, and connect with like-minded people.",
};

export default function RootLayout(
  props
: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} relative scroll pb-10 overflow-x-hidden dark`}>
        <Header />
        {props.children}
        <NextTopLoader />
        <Toaster />
      </body>
    </html>
  );
}
