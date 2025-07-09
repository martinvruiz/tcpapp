"use client";
import { motion } from "framer-motion";
import Login from "@/components/Login";
import UserProfile from "@/components/UserProfile";
import { useStore } from "@/store/useStore";

export default function page() {
  const profile = useStore((state) => state.profile);

  return (
    <motion.div
      className="bg-white text-black min-h-[60vh] md:min-w-3xl max-w-4xl min-w-xs flex flex-col items-center justify-center p-2 pt-4 mt-6 md:mt-0 rounded-xl shadow-2xl"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <h2 className="text-3xl mt-2 font-bold">Your profile</h2>
      {profile ? <UserProfile user={profile} /> : <Login />}
    </motion.div>
  );
}
