import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import localFont from 'next/font/local'
import "./globals.css";

// const lxgwFont = localFont({
//   src: './LXGWWenKai-Light.ttf',
// })
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "李梦鱼的个人主页",
  description: "李梦鱼的个人主页",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
