"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import "../globals.css";
import ContrastIcon from "@mui/icons-material/Contrast";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (status === "loading") {
    return (
      <nav className="flex justify-between items-center p-4 px-10 py-6">
        <div className="text-xl sm:text-3xl font-black ml-4">
          <h1 style={{ fontFamily: "var(--font-funnel-display)" }}>
            <Link href="/">PHARMAVERSE</Link>
          </h1>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative">
      <div className="flex justify-between items-center p-4 px-10 py-6">
        <div className="text-xl sm:text-3xl font-black ml-4">
          <h1 style={{ fontFamily: "var(--font-funnel-display)" }}>
            <Link href="/">PHARMAVERSE</Link>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden z-50"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex space-x-4 items-center justify-center mt-0 gap-8 text-0.5xl">
          {status === "authenticated" && session ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:border-b-3 hover:border-solid hover:border-[var(--font--nav)]"
                >
                  Dashboard
                </Link>
              </li>
              {session?.user?.role === "admin" && (
                <li>
                  <Link
                    href="/users"
                    className="hover:border-b-3 hover:border-solid hover:border-[var(--font--nav)]"
                  >
                    Users
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/profile"
                  className="hover:border-b-3 hover:border-solid hover:border-[var(--font--nav)]"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:border-b-3 hover:border-solid hover:border-[var(--font--nav)]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:border-b-3 hover:border-solid hover:border-[var(--font--nav)]"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <button onClick={toggleTheme} className="rounded">
            <ContrastIcon />
          </button>
        </ul>

        {/* Mobile Navigation */}
        <div
          className={`
            fixed top-0 right-0 h-screen w-64
            bg-[var(--foreground)]  text-[var(--color-white)]
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            shadow-lg z-40 sm:hidden
            flex flex-col pt-20 px-6
          `}
        >
          {status === "authenticated" && session ? (
            <>
              <Link
                href="/dashboard"
                className="py-3 border-b hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              {session?.user?.role === "admin" && (
              <Link
                href="/users"
                className="py-3 border-b hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
              )}
              <Link
                href="/profile"
                className="py-3 border-b hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="py-3 border-b hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="py-3 border-b hover:text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
            className="py-3 flex items-center gap-2"
          >
            <ContrastIcon /> Theme
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
