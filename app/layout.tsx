import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zap Budget Tracker",
  description: "Smart budget tracking made simple with Gmail integration",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    fetch(
      "https://asia-south1-zap-dev-384118.cloudfunctions.net/feedback-service?load=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => {
        console.log("Form submitted successfully");
      })
      .catch((error) => console.error(error));
  });

  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId='G-MSP27XE5GZ' />
      <Script src='https://scripts.simpleanalyticscdn.com/latest.js' />
    </html>
  );
}
