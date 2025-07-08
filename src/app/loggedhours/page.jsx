"use client";
import { motion } from "framer-motion";
import LoggedHours from "@/components/LoggedHours";
import Modal from "@/components/Modal";
import MonthSelector from "@/components/MonthSelector";
import TotalHours from "@/components/TotalHours";
import ViewHour from "@/components/ViewHour";
import { useWorkHours } from "@/hooks/useWorkHours";
import { useStore } from "@/store/useStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { confirmToast } from "@/utils/toastUtils";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function page() {
  const loggedHours = useStore((state) => state.loggedHours);
  const totalHours = useStore((state) => state.totalHours);
  const deleteHour = useStore((state) => state.deleteHour);
  const profile = useStore((state) => state.profile);

  const [filteredHours, setFilteredHours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [month, setMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const { fetchWorkHoursByMonth, fetchTotalTime, deleteWorkHour } =
    useWorkHours();

  const handleMonthSelect = async (year, month) => {
    if (!profile) return;

    if (!year || !month) {
      setFilteredHours(loggedHours);
      return;
    }

    setSelectedMonth(month);
    setSelectedYear(year);

    const data = await fetchWorkHoursByMonth(profile.id, year, month);
    setFilteredHours(data);

    const monthName = monthNames[month - 1];
    setMonth(monthName);

    await fetchTotalTime(profile.id, year, month);
  };

  const handleDelete = (entry) => {
    confirmToast({
      message: `Delete this item: ${entry.notes}`,
      onConfirm: () => handleDeleteEntry(entry),
    });
  };

  const handleDeleteEntry = async (entry) => {
    await deleteWorkHour(entry.id);
    deleteHour(entry.id);

    await fetchTotalTime(profile.id, selectedYear, selectedMonth);

    setFilteredHours((prev) => prev.filter((hour) => hour.id !== entry.id));

    setModalOpen(false);
  };

  useEffect(() => {
    if (!month) {
      setFilteredHours(loggedHours);
    }
  }, [loggedHours, month]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
      className="max-w-md min-h-[60dvh] mx-auto p-6 my-6 bg-white rounded-lg shadow-md text-black md:min-w-4xl sm:min-w-xl"
    >
      <div className="flex flex-col items-center justify-center">
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
            <p>Log in to see your data</p>
          )}
        </div>

        <div>
          {totalHours ? (
            <TotalHours totalHours={totalHours} month={month} />
          ) : (
            <div>no data yet :/</div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          {filteredHours.length > 0 ? (
            <LoggedHours
              loggedTime={filteredHours}
              onView={(hour) => {
                setSelectedHour(hour);
                setModalOpen(true);
              }}
            />
          ) : (
            <div className="w-full bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500 shadow-sm my-2">
              <p className="text-base font-medium">No data yet :/</p>
            </div>
          )}
        </div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ViewHour
            hour={selectedHour}
            handleDeleteEntry={() => handleDelete(selectedHour)}
          />
        </Modal>
      </div>
    </motion.div>
  );
}
