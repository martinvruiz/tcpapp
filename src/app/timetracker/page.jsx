"use client";
import TimeTracker from "@/components/TimeTracker";
import { useWorkHours } from "@/hooks/useWorkHours";
import { useStore } from "@/store/useStore";
import React, { useState, useEffect } from "react";

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
    const start = new Date(`${entryDate}T${entryTime}`);
    const end = new Date(`${exitDate}T${exitTime}`);
    if (!user) {
      alert("You must log in to use the app");
      return;
    }

    if (end <= start) {
      setDuration("Exit must be after Entry");
      return;
    }

    const diff = end - start;
    const totalHours = diff / (1000 * 60 * 60);
    const totalMinutes = Math.round(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

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
      await fetchTotalTime(user.id);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black md:min-w-3xl min-w-xs my-4 ">
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
          className="bg-blue-900 p-3 rounded-md text-white"
          onClick={() => calculateDuration()}
        >
          Log time
        </button>
        <p className="font-medium text-center">
          Total time logged: <span className="text-blue-600">{duration}</span>
        </p>
        {duration && !duration.includes("h") && (
          <p className="text-red-500 text-sm text-center mt-1">{duration}</p>
        )}
      </div>
    </div>
  );
}
