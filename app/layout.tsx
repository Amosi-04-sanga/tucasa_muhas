import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import Head from "next/head";

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
  creator: "Amosi sanga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Add your icons and manifest here */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={``}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
