import SignUp from "@/components/SignUp";
import React from "react";

export default function page() {
  return (
    <div className="bg-white text-black min-h-[60vh] md:min-w-3xl max-w-4xl min-w-xs flex flex-col items-center justify-center p-2 pt-4 mt-6 md:mt-0 rounded-xl shadow-xl">
      <h2 className="text-3xl pb-4 font-bold">Sign up</h2>
      <SignUp />
    </div>
  );
}
