export default function LoggedHours({ loggedTime }) {
  const pad = (num) => String(num).padStart(2, "0");

  if (!loggedTime || loggedTime.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {loggedTime.map((time, index) => {
        const total = time.total_hours || 0;
        const hours = Math.floor(total);
        const minutes = Math.round((total - hours) * 60);

        return (
          <div
            key={index}
            className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300 rounded-lg p-4 flex flex-row items-center justify-center md:justify-between text-center gap-2 w-full text-sm sm:text-base min-w-xs sm:min-w-lg"
          >
            <h4 className="font-semibold text-gray-800 w-2/5 md:text-start">
              {time.notes || "No notes"}
            </h4>

            <div className="flex gap-3 w-4/5 justify-end">
              <span className="px-4 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-600">
                Hour: {pad(hours)}
              </span>

              <span className="px-4 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-600">
                Min: {pad(minutes)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
