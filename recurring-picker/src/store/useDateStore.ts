import { create } from "zustand";

type MonthlyPattern = {
  week: string;
  day: string;
};

type DateStore = {
  startDate: string;
  endDate: string;
  frequency: string;
  interval: number;
  weekDays: string[];
  monthlyPattern: MonthlyPattern;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setFrequency: (freq: string) => void;
  setInterval: (i: number) => void;
  toggleWeekDay: (day: string) => void;
  setMonthlyPattern: (pattern: MonthlyPattern) => void;
};

export const useDateStore = create<DateStore>((set) => ({
  startDate: "",
  endDate: "",
  frequency: "daily",
  interval: 1,
  weekDays: [],
  monthlyPattern: { week: "2", day: "Tuesday" },
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setFrequency: (frequency) => set({ frequency }),
  setInterval: (interval) => set({ interval }),
  toggleWeekDay: (day) =>
    set((state) => ({
      weekDays: state.weekDays.includes(day)
        ? state.weekDays.filter((d) => d !== day)
        : [...state.weekDays, day],
    })),
  setMonthlyPattern: (monthlyPattern) => set({ monthlyPattern }),
}));
