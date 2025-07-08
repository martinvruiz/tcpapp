"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useWorkHours } from "@/hooks/useWorkHours";
import { useStore } from "@/store/useStore";

export default function Login() {
  const { logIn, loading, error } = useAuth();
  const { fetchWorkHours } = useWorkHours();
  const setLoggedHours = useStore((state) => state.setLoggedHours);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    if (!email || !password) {
      alert("email or password missing");
    }
    const { data, error } = await logIn(email, password);
    if (error) {
      alert(error);
      return;
    }
    const hours = await fetchWorkHours(data.user.id);
    setLoggedHours(hours);
  };
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-sky-900 rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Log in
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border border-gray-300 rounded-xl px-4 py-2 w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col justify-center gap-4 pt-4">
            <button
              onClick={() => handleLogIn()}
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-200 cursor-pointer min-w-3xs"
            >
              Log in
            </button>
            <Link href="/profile/signup" className="w-full md:w-auto">
              <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-200 cursor-pointer min-w-3xs">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
