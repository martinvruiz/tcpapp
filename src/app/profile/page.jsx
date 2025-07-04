"use client";
import Login from "@/components/Login";
import UserProfile from "@/components/userProfle";
import { useStore } from "@/store/useStore";

export default function page() {
  const profile = useStore((state) => state.profile);

  return (
    <div className="bg-white text-black min-h-[60vh] md:min-w-3xl max-w-4xl min-w-xs flex flex-col items-center p-2 pt-4 mt-6 md:mt-0 rounded-xl shadow-2xl">
      <h2 className="md:text-3xl text-xl font-bold">Your profile</h2>
      {profile ? <UserProfile user={profile} /> : <Login />}
    </div>
  );
}
