"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh overflow-x-hidden">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sky-900 text-white p-6 z-50 transform transition-transform duration-200 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Link href={"/"} onClick={() => setOpen(false)}>
          <h2 className="text-2xl font-bold mb-6">TCP App</h2>
        </Link>
        <nav className="flex flex-col space-y-4">
          <Link
            href={"/timetracker"}
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            <span>Time Tracker</span>
          </Link>
          <Link
            href={"/loggedhours"}
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Logged hours</span>
          </Link>
          <Link
            href={"/profile"}
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 top-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 w-screen md:pl-64 shadow-md">
        <header className="bg-sky-900 shadow-md p-4 fixed w-full md:hidden flex justify-between items-center">
          <button onClick={() => setOpen(true)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <main className="w-full h-full flex-1 flex flex-col items-center justify-center pt-0 bg-sky-700">
          {children}
        </main>
      </div>
    </div>
  );
}
