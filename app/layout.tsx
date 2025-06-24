import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "tucasa muhas",
  description:
    "tucasa muhas family, a student religious organization at Muhimbili university of health and allied sciences",
  keywords: [
    "tucasa muhas",
    "tucasa muhas family",
    "tucasa",
    "muhimbili university",
    "muhimbili",
    "student organization",
    "religious organization",
  ],
  creator: 'Amosi sanga'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
