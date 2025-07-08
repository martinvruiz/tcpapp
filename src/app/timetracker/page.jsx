"use client";
import { motion } from "framer-motion";
import TimeTracker from "@/components/TimeTracker";
import { useWorkHours } from "@/hooks/useWorkHours";
import { useStore } from "@/store/useStore";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function page() {
  const { saveWorkHours, fetchTotalTime } = useWorkHours();
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [entryDate, setEntryDate] = useState(currentDate);
  const [entryTime, setEntryTime] = useState(currentTime);
  const [exitDate, setExitDate] = useState(currentDate);
  const [exitTime, setExitTime] = useState(currentTime);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const addHour = useStore((state) => state.addHour);
  const user = useStore((state) => state.profile);

  const calculateDuration = async () => {
    if (!user) {
      toast.warn("You must be logged in to register your work hours.");
      return;
    }

    if (!entryDate || !entryTime || !exitDate || !exitTime) {
      toast.warn("Please complete all fields before saving.");
      return;
    }

    const start = new Date(`${entryDate}T${entryTime}`);
    const end = new Date(`${exitDate}T${exitTime}`);

    if (isNaN(start) || isNaN(end)) {
      toast.warn("Invalid date or time format.");
      return;
    }

    if (start.getTime() === end.getTime()) {
      toast.warn("Entry and exit times cannot be the same.");
      return;
    }

    if (end <= start) {
      toast.warn("Exit must be after entry.");
      return;
    }
    const diff = end - start;
    const totalHours = diff / (1000 * 60 * 60);
    const totalMinutes = Math.round(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (totalHours > 16) {
      const confirm = window.confirm(
        "Are you sure you worked more than 16 hours?"
      );
      if (!confirm) return;
    }

    setDuration(`${hours}h ${minutes}m`);

    const result = await saveWorkHours({
      user_id: user.id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      total_hours: totalHours,
      notes: title,
    });

    if (result) {
      addHour(result[0]);
    }

    toast.success("Saved");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black md:min-w-3xl min-w-xs my-4 "
    >
      <TimeTracker
        entryDate={entryDate}
        entryTime={entryTime}
        exitDate={exitDate}
        exitTime={exitTime}
        onChangeEntryDate={(e) => setEntryDate(e.target.value)}
        onChangeEntryTime={(e) => setEntryTime(e.target.value)}
        onChangeExitDate={(e) => setExitDate(e.target.value)}
        onChangeExitTime={(e) => setExitTime(e.target.value)}
        valueInput={title}
        onChangeTitle={(e) => setTitle(e.target.value)}
      />
      <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center gap-2">
        <button
          className="bg-sky-900 hover:bg-sky-600 p-3 px-8 rounded-md text-white"
          onClick={() => calculateDuration()}
        >
          Save time
        </button>
        <p className="font-medium text-center">
          Total time logged: <span className="text-blue-600">{duration}</span>
        </p>
        {duration && !duration.includes("h") && (
          <p className="text-red-500 text-sm text-center mt-1">{duration}</p>
        )}
      </div>
    </motion.div>
  );
}
