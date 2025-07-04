"use client";
import { useAuth } from "@/hooks/useAuth";
import { useWorkHours } from "@/hooks/useWorkHours";
import React, { useEffect } from "react";

export default function Initialize() {
  const { initializeProfile } = useAuth();
  const { fetchTotalTime } = useWorkHours();

  useEffect(() => {
    const loadData = async () => {
      const user = await initializeProfile();
      if (user && user.id) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        await fetchTotalTime(user.id, year, month);
      }
    };

    loadData();
  }, []);

  return null;
}
