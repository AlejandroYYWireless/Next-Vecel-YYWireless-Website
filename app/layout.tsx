import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "YYWireless",
  description: "Wholesale Tech Provider",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <link rel="icon" href="/icon.png" sizes="any" />
      {/* i hate this font */}
      <body className="antialiased">
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
        <script>AOS.init();</script>
      </body>
    </html>
  );
}
