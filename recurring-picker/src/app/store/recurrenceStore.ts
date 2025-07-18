import { create } from "zustand";

type Frequency = "daily" | "weekly" | "monthly" | "yearly";

interface RecurrenceState {
  frequency: Frequency;
  setFrequency: (f: Frequency) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  frequency: "daily",
  setFrequency: (f) => set({ frequency: f }),
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
