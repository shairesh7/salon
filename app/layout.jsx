import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootstrapClient from "./BootstrapClient";

export const metadata = {
  title: "Salon",
  description: "Salon Project with Next.js",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Load Bootstrap JS only on client */}
        <BootstrapClient />

        {children}
      </body>
    </html>
  );
}
