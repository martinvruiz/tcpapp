import { useWorkHours } from "@/hooks/useWorkHours";
import React, { useEffect, useState } from "react";

export default function MonthSelector({ userId, onSelectMonth }) {
  const [months, setMonths] = useState([]);
  const [selected, setSelected] = useState("");
  const { fetchAvailableMonths } = useWorkHours();

  useEffect(() => {
    const loadMonths = async () => {
      const data = await fetchAvailableMonths(userId);
      setMonths(data);
      if (data.length > 0) {
        const firstOption = `${data[0].year}-${String(data[0].month).padStart(
          2,
          "0"
        )}`;
        setSelected(firstOption);
        onSelectMonth(data[0].year, data[0].month);
      }
    };

    loadMonths();
  }, [userId]);

  const handleChange = (e) => {
    setSelected(e.target.value);
    const [year, month] = e.target.value.split("-").map(Number);
    onSelectMonth(year, month);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="p-2 rounded border"
    >
      {months.map(({ year, month }) => (
        <option
          key={`${year}-${month}`}
          value={`${year}-${String(month).padStart(2, "0")}`}
        >
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </option>
      ))}
    </select>
  );
}
