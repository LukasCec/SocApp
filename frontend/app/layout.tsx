import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex min-h-screen">
          <div className="bg-black text-white w-1/8 py-4 border-r border-gray-900 flex flex-col text-center items-start gap-2">
              <h1 className="text-2xl w-full text-center">SocApp</h1>
              <div className="w-full p-2 cursor-pointer text-center border-b border-gray-900 duration-300 hover:bg-gray-900 rounded">Home</div>
              <div className="w-full p-2 cursor-pointer text-center border-b border-gray-900 duration-300 hover:bg-gray-900 rounded">Search</div>
              <div className="w-full p-2 cursor-pointer text-center border-b border-gray-900 duration-300 hover:bg-gray-900 rounded">Add</div>
          </div>

          <div className="flex-1 bg-black">{children}</div>
      </div>
      </body>
      </html>
  );
}
