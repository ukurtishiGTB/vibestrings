import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import { ApolloWrapper } from "@/lib/apolloWraper";
import { ReactNode } from "react";
//import { LanguageProvider } from "@/context/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeStrings - Browse Top Quality Guitars Online",
  description: "Explore 500+ latest collections of branded guitars online with VibeStrings.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <ApolloWrapper>
          
            {children}
          
        </ApolloWrapper>
      </body>
    </html>
  );
}
