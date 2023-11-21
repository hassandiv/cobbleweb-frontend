import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cobbleweb Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
