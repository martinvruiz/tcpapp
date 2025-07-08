import React from "react";

export default function TotalHours({ totalHours, month }) {
  return (
    <div className="max-w-sm mx-auto bg-sky-100 text-sky-900 rounded-lg shadow p-2 px-4 my-2 text-center flex items-center justify-center gap-2">
      <h3 className="font-semibold">Total {month} hours: </h3>
      <p className="font-bold">
        {totalHours.hours}h {totalHours.minutes}m
      </p>
    </div>
  );
}
