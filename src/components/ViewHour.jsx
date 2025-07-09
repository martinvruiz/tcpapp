import React from "react";

export default function ViewHour({ hour, handleDeleteEntry }) {
  const start = new Date(hour.start_time);
  const end = new Date(hour.end_time);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTotalHours = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours} h ${minutes} m`;
  };

  return (
    <div className="p-6 max-w-md flex flex-col w-full md:text-center bg-white">
      <div className="px-1">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Work Hour Details
        </h2>
        <p>
          <strong>Start date:</strong> {formatDate(start)} at{" "}
          {formatTime(start)}
        </p>
        <p>
          <strong>End date:</strong> {formatDate(end)} at {formatTime(end)}
        </p>
        <p>
          <strong>Total:</strong> {formatTotalHours(hour.total_hours)}
        </p>
        {hour.notes && (
          <p>
            <strong>Notes:</strong> {hour.notes}
          </p>
        )}
      </div>
      <button
        onClick={handleDeleteEntry}
        className="w-full bg-sky-900 hover:bg-sky-600 text-white p-2 rounded mt-2"
      >
        Delete entry
      </button>
    </div>
  );
}
