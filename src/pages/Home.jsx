"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
      className="flex flex-col items-center justify-center text-gray-800 px-4"
    >
      <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="md:text-5xl text-2xl font-extrabold leading-tight">
          Welcome to TCP App
        </h1>
        <p className="mt-6 text-md md:text-xl text-gray-600">
          Record your clock-in and clock-out times seamlessly with this
          user-friendly work schedule app, powered by Next.js and Tailwind CSS.
        </p>
        <div className="pt-8">
          <Link
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            href={"/profile"}
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
