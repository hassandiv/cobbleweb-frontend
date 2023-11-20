"use server";

import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import Button from "../../components/button";
import Link from "next/link";

export default async function Header() {
  const TOKEN = "token";
  const isAuth = getCookie(TOKEN);
  const cookie = cookies();
  const getToken = cookie.get(TOKEN);
  // const deleteToken = cookie.delete(TOKEN);
  console.log("isAuth", isAuth);
  console.log("getToken", getToken);
  // const handleSignOut = () => deleteCookie("token");

  return (
    <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div className="container max-w-screen-xl flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
        <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          Cobbleweb
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <Link href="/" className="mr-5 font-medium hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="mr-5 font-medium hover:text-gray-900">
            About
          </Link>
          <Link
            href="/contact"
            className="mr-5 font-medium hover:text-gray-900"
          >
            Contact
          </Link>
        </nav>
        <div className="items-center h-full">
          {!getToken?.value ? (
            <>
              <Link
                href="/login"
                className="mr-5 font-medium hover:text-gray-900"
              >
                Login
              </Link>
              <Button text="sign up" to="/signup" />
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="mr-5 font-medium hover:text-gray-900"
              >
                Account
              </Link>
              {/* <Button text="sign up" to="/signup" /> */}
              {/* <button onClick={() => cookie.delete(TOKEN)}>Sign out</button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
