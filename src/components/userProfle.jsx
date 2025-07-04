import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function UserProfile({ user }) {
  if (!user) return null;

  const { logOut } = useAuth();

  const { email, user_metadata, created_at } = user;
  const name = user_metadata?.name || "Anonymous";

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white rounded-3xl p-6 text-gray-800"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-sky-900 text-3xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
        <div className="w-full border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 text-center">
            Registered on {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        className="px-4 py-2 my-4 bg-sky-900 text-white rounded hover:bg-sky-600 transition duration-200 cursor-pointer min-w-3xs"
        onClick={() => logOut()}
      >
        Log out
      </button>
    </motion.div>
  );
}
