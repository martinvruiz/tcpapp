import { create } from "zustand";

export const useStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  loggedHours: [],
  setLoggedHours: (hours) => set({ loggedHours: hours }),
  addHour: (hour) => {
    if (!hour) {
      alert("you must enter valid data");
      return;
    }

    set((state) => ({ loggedHours: [...state.loggedHours, hour] }));
  },
  totalHours: null,
  setTotalHours: (total) => set({ totalHours: total }),
}));
