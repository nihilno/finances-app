import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import Providers from "@/components/global/providers";
import { padding } from "@/lib/consts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Finances",
    template: "%s | Finances",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "text-sm md:text-base")}>
        <Providers>
          <div
            className={cn(
              "mx-auto flex min-h-dvh max-w-480 flex-col antialiased",
              padding,
            )}
          >
            <Header />
            <main className="my-8 flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
