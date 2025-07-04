import React from "react";

export default function TimeTracker({
  entryDate,
  exitDate,
  exitTime,
  entryTime,
  onChangeEntryDate,
  onChangeEntryTime,
  onChangeExitDate,
  onChangeExitTime,
  valueInput,
  onChangeTitle,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Time Tracker</h2>

      <input
        type="text"
        value={valueInput}
        onChange={onChangeTitle}
        placeholder="Title (max 10 caract.)"
        maxLength={10}
        className="border border-gray-300 rounded-lg my-2 px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-3xs"
      />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Clock-in time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={entryDate}
              onChange={onChangeEntryDate}
              max={exitDate}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={entryTime}
              onChange={onChangeEntryTime}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Clock-out time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={exitDate}
              onChange={onChangeExitDate}
              min={entryDate}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={exitTime}
              onChange={onChangeExitTime}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
