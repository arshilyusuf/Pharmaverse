import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { Inter } from "next/font/google";
import { Funnel_Display } from "next/font/google";
import React from "react";
import { connectDB } from "./lib/db";
import AuthProvider from "./components/AuthProvider";
import LoadingProvider from "./components/LoadingProvider";
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-funnel-display",
});


export const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-host-grotesk",
});

export const metadata = {
  title: "Pharmaverse",
  description: "Smart Drug Inventory & Supply Management",
  icons: {
    icon: "/globe.svg",
  },
};

export default async function RootLayout({ children }) {
  const conn = await connectDB();

  return (
    <html lang="en">
      
      <body className={`${hostGrotesk.variable} antialiased`}>
        <AuthProvider>
          <LoadingProvider>
            <Navigation />
            {children}{" "}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
