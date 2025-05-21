import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal-Finance-Visualizer",
  description:
    "A modern web app to track personal finances effortlessly. Manage transactions, visualize expenses by category, and set budgets with easy-to-understand charts. Built with Next.js and deployed on Vercel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Navbar></Navbar>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
