import { motion } from "framer-motion";

export default function LoggedHours({ loggedTime, onView }) {
  const pad = (num) => String(num).padStart(2, "0");

  if (!loggedTime || loggedTime.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1"
    >
      {loggedTime.map((time, index) => {
        const total = time.total_hours || 0;
        const hours = Math.floor(total);
        const minutes = Math.round((total - hours) * 60);

        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={index}
            onClick={() => onView?.(time)}
            className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300 rounded-lg p-4 flex flex-row items-center justify-center md:justify-between text-center gap-2 w-full text-sm sm:text-base min-w-xs sm:min-w-lg"
          >
            <h4 className="font-semibold text-gray-800 w-2/5 md:text-start">
              {time.notes || "N/A"}
            </h4>

            <div className="flex gap-3 w-4/5 justify-end">
              <span className="px-4 py-1 rounded-lg text-xs font-medium bg-sky-100 text-sky-600">
                Hour: {pad(hours)}
              </span>

              <span className="px-4 py-1 rounded-lg text-xs font-medium bg-sky-100 text-sky-600">
                Min: {pad(minutes)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
