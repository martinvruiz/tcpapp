import { useStore } from "@/store/useStore";
import { supabase } from "@/supabase/supabaseClient";
import React, { useState } from "react";

export function useWorkHours() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setTotalHours = useStore((state) => state.setTotalHours);

  const saveWorkHours = async ({
    user_id,
    start_time,
    end_time,
    total_hours,
    notes,
  }) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("loggedHours")
      .insert([{ user_id, start_time, end_time, total_hours, notes }])
      .select();

    setLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    return data;
  };

  const fetchWorkHours = async (userId) => {
    const { data, error } = await supabase
      .from("loggedHours")
      .select("*")
      .eq("user_id", userId)
      .order("start_time", { ascending: false });

    if (error) {
      console.error("Error fetching data", error.message);
      return [];
    }

    return data;
  };

  const fetchTotalTime = async (userId, year, month) => {
    const { data, error } = await supabase.rpc(
      "get_total_work_hours_by_month",
      {
        user_id_input: userId,
        year_input: year,
        month_input: month,
      }
    );

    if (error) {
      console.error("Error fetching total hours:", error.message);
      return null;
    }

    if (!data || data.length === 0) {
      setTotalHours(null);
      return null;
    }

    setTotalHours(data[0]);
    return data[0];
  };

  const fetchAvailableMonths = async (userId) => {
    const { data, error } = await supabase.rpc("get_available_months", {
      user_id_input: userId,
    });

    if (error) {
      console.error("Error fetching months:", error.message);
      return [];
    }

    return data;
  };
  const fetchWorkHoursByMonth = async (userId, year, month) => {
    const { data, error } = await supabase.rpc(
      "get_work_hours_records_by_month",
      {
        user_id_input: userId,
        year_input: year,
        month_input: month,
      }
    );

    if (error) {
      console.error("Error fetching hours by month:", error.message);
      return [];
    }

    return data;
  };

  const deleteWorkHour = async (id) => {
    const { error, data } = await supabase
      .from("loggedHours")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("error deleting entry", error);
      return;
    }
    return data;
  };
  return {
    saveWorkHours,
    fetchWorkHours,
    fetchTotalTime,
    fetchAvailableMonths,
    fetchWorkHoursByMonth,
    deleteWorkHour,
    loading,
    error,
  };
}
