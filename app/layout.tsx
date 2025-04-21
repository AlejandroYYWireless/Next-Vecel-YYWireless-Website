import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/navbar/Navbar";

//
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "YYWireless",
  description: "Wholesale Tech Provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // we get a hydration warning because of Next Theme but the supressHydrationWarning will stop that from happening.
    <html lang="en" suppressHydrationWarning>
      {/* Here we're defining the favicon location */}
      <link rel="icon" href="/icon.png" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Navbar>{children}</Navbar>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
