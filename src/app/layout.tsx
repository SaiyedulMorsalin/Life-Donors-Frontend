import "@/styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { type Metadata } from "next";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeDonors",
  description: "Give red love save red lives",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <head>
        <title>LifeDonors</title>
      </head>
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
