"use client";

import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";
import Button from "@/app/components/button";

export default function Header() {
  const TOKEN = "token";
  const authToken = getCookie(TOKEN);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    router.refresh();
    deleteCookie(TOKEN);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  interface NavigationLinksProps {
    onClick: () => void;
  }

  const NavigationLinks = ({ onClick }: NavigationLinksProps) => {
    return (
      <ul className="flex flex-col md:flex-row items-center p-4 md:p-0 justify-between h-1/2 w-full md:w-44">
        <NavItem href="/" text="Home" onClick={onClick} />
        <NavItem href="/about" text="About" onClick={onClick} />
        <NavItem href="/contact" text="Contact" onClick={onClick} />
      </ul>
    );
  };

  interface NavItemProps {
    href: string;
    text: string;
    onClick: () => void;
  }

  const NavItem = ({ href, text, onClick }: NavItemProps) => {
    return (
      <li>
        <Link
          href={href}
          className="mr-0 md:mr-5 font-medium hover:text-gray-900"
          onClick={onClick}
        >
          {text}
        </Link>
      </li>
    );
  };

  const unauthLinks = () => {
    return (
      <>
        <Link
          href="/login"
          className="font-medium hover:text-gray-900 mr-0 md:mr-5"
          suppressHydrationWarning={true}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          Login
        </Link>
        <Button
          text="Register"
          to="/register"
          suppressHydrationWarning={true}
          submit={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </>
    );
  };

  const authLinks = () => {
    return (
      <>
        <Link
          href="/profile"
          className="font-medium hover:text-gray-900 mr-0 md:mr-5"
          suppressHydrationWarning={true}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
    );
  };

  return (
    <header
      className={
        authToken
          ? "bg-green-100"
          : "bg-white" +
            " w-full text-gray-700 border-t border-gray-100 shadow-sm body-font"
      }
      suppressHydrationWarning={true}
    >
      <div className="container max-w-screen-xl flex flex-col items-center justify-between p-6 mx-auto md:flex-row relative">
        <div className="flex items-center mb-4 w-full md:w-auto font-medium text-gray-900 title-font md:mb-0">
          <a href="/">Cobbleweb</a>
          <div
            className="md:hidden cursor-pointer ml-auto mr-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>
        </div>
        <nav className="hidden md:flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <NavigationLinks onClick={closeMobileMenu} />
        </nav>
        <div className="items-center h-full hidden md:block">
          {!authToken ? unauthLinks() : authLinks()}
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-20 mt-2 left-0 bg-white h-80 w-full border-t border-gray-200 md:hidden transition-opacity duration-300 z-50">
            <NavigationLinks onClick={closeMobileMenu} />
            <div className="flex flex-col justify-between items-center mt-3 h-20">
              {!authToken && mobileMenuOpen ? unauthLinks() : authLinks()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
