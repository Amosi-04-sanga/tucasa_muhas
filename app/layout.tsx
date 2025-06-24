import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";



export const metadata: Metadata = {
  title: "tucasa muhas",
  description: "regious organization from Muhimbili university of health and allied sciences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
