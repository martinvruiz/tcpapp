import React from "react";

export default function TotalHours({ totalHours }) {
  return (
    <div className="max-w-sm mx-auto bg-indigo-100 text-indigo-900 rounded-lg shadow p-2 px-4 my-2 text-center flex items-center justify-center gap-2">
      <h3 className="font-semibold">Total Hours: </h3>
      <p className="font-bold">
        {totalHours.hours}h {totalHours.minutes}m
      </p>
    </div>
  );
}
