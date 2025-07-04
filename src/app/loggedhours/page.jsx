"use client";
import LoggedHours from "@/components/LoggedHours";
import MonthSelector from "@/components/MonthSelector";
import TotalHours from "@/components/TotalHours";
import { useWorkHours } from "@/hooks/useWorkHours";
import { useStore } from "@/store/useStore";
import React, { useEffect, useState } from "react";

export default function page() {
  const loggedHours = useStore((state) => state.loggedHours);
  const totalHours = useStore((state) => state.totalHours);
  const profile = useStore((state) => state.profile);

  const [filteredHours, setFilteredHours] = useState([]);
  const { fetchWorkHoursByMonth, fetchTotalTime } = useWorkHours();

  const handleMonthSelect = async (year, month) => {
    if (!profile) return;

    if (!year || !month) {
      setFilteredHours(loggedHours);
      return;
    }
    const data = await fetchWorkHoursByMonth(profile.id, year, month);
    setFilteredHours(data);

    await fetchTotalTime(profile.id, year, month);
  };

  useEffect(() => {
    console.log("loggedHours:", loggedHours);
    console.log("filteredHours:", filteredHours);
  }, [loggedHours, filteredHours]);

  return (
    <div className="max-w-md mx-auto p-6 mt-6 md:mt-0 bg-white rounded-lg shadow-md text-black md:min-w-4xl sm:min-w-xl">
      <div className="flex flex-col items-center">
        <h2 className="text-xl md:text-3xl font-bold py-2">
          Your logged hours
        </h2>

        <div className="mb-4">
          {profile?.id ? (
            <MonthSelector
              userId={profile.id}
              onSelectMonth={handleMonthSelect}
            />
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        <div>
          {totalHours ? (
            <TotalHours totalHours={totalHours} />
          ) : (
            <div>no data</div>
          )}
        </div>

        <div>
          {filteredHours.length > 0 ? (
            <LoggedHours loggedTime={filteredHours} />
          ) : (
            <div className="w-full bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500 shadow-sm my-2">
              <p className="text-base font-medium">No data yet :/</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
