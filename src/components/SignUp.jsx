"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";

export default function SignUp() {
  const { signUp, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || !confirmPassword || !name) {
      alert("You must complete all the requirements");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { error, data } = await signUp(email, password, name);
    if (error) {
      alert(error);
      return;
    }
    setLoading(false);
    console.log(data);
    alert("Check your email");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md flex flex-col items-center w-full mx-auto space-y-4"
    >
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full max-w-2xs md:max-w-xl p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded max-w-2xs md:max-w-xl"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded max-w-2xs md:max-w-xl"
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full p-2 border rounded max-w-2xs md:max-w-xl"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-500 text-white p-2 rounded"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
