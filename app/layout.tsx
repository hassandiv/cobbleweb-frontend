"use client";

import { Inter } from "next/font/google";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authToken = getCookie("token");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authToken && pathname === "/profile") {
      return router.push("/");
    }
  }, [authToken, pathname, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container max-w-screen-xl min-h-screen p-6 mx-auto md:flex-row">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
