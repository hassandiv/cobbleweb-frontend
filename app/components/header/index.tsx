"use client";

import { getCookie, deleteCookie } from "cookies-next";

import Link from "next/link";
import Button from "@/app/components/button";

export default function Header() {
  const TOKEN = "token";
  const authToken = getCookie(TOKEN);

  const handleSignOut = () => {
    window.location.reload();
    deleteCookie(TOKEN);
  };

  return (
    <header
      className={
        authToken
          ? "bg-green-100"
          : "bg-white" +
            "w-full text-gray-700  border-t border-gray-100 shadow-sm body-font"
      }
      suppressHydrationWarning={true}
    >
      <div className="container max-w-screen-xl flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
        <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          Cobbleweb
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <ul className="flex flex-row items-center justify-between w-44">
            <li>
              <Link href="/" className="mr-5 font-medium hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="mr-5 font-medium hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="mr-5 font-medium hover:text-gray-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="items-center h-full">
          {!authToken ? (
            <>
              <Link
                href="/login"
                className="mr-5 font-medium hover:text-gray-900"
                suppressHydrationWarning={true}
              >
                Login
              </Link>
              <Button
                text="Register"
                to="/register"
                suppressHydrationWarning={true}
              />
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="mr-5 font-medium hover:text-gray-900"
                suppressHydrationWarning={true}
              >
                Profile
              </Link>
              <Button
                text="Logout"
                to="/"
                submit={handleSignOut}
                suppressHydrationWarning={true}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
