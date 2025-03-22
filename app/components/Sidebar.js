"use client";

import Link from "next/link";
import { doLogOut } from "../actions";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    await doLogOut();
    window.location.href = "/";
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-5 left-0 z-50 text-white bg-[var(--foreground)] p-2 rounded-tr-xl rounded-br-xl md:hidden"
        >
          <MenuIcon />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64 
        md:w-1/5 md:relative md:h-[90%]
        text-white bg-[var(--foreground)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        py-5 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl
        z-40
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          <CloseIcon />
        </button>

        <ul className="flex flex-col gap-2 mt-12 md:mt-0">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <li className="px-4 py-2 text-xl w-[90%] rounded-tr-xl rounded-br-xl bg-white/6 hover:bg-white/25 transition-colors">
              Stats
            </li>
          </Link>
          <Link href="/dashboard/drugs" onClick={() => setIsOpen(false)}>
            <li className="px-4 py-2 text-xl w-[90%] rounded-tr-xl rounded-br-xl bg-white/6 hover:bg-white/25 transition-colors">
              Drugs
            </li>
          </Link>
          <Link href="/dashboard/supplyorders" onClick={() => setIsOpen(false)}>
            <li className="px-4 py-2 text-xl w-[90%] rounded-tr-xl rounded-br-xl bg-white/6 hover:bg-white/25 transition-colors">
              Supply Orders
            </li>
          </Link>
        </ul>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="px-4 py-2 text-xl w-[90%] rounded-tr-xl rounded-br-xl hover:bg-red-500 transition-colors"
          >
            Log Out
          </button>
        </form>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
