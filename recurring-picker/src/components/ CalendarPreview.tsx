"use client";
// CalendarPreview.tsx
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  isAfter,
} from "date-fns";
import React from "react";

interface Props {
  startDate: string;
  endDate?: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  weekDays?: string[];
  monthlyPattern?: { week: string; day: string };
}

const weekDayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const fullDayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const CalendarPreview: React.FC<Props> = ({
  startDate,
  endDate,
  frequency,
  interval,
  weekDays = [],
  monthlyPattern,
}) => {
  const occurrences: string[] = [];
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : addYears(start, 1);

  let current = new Date(start);

  while (isBefore(current, end)) {
    if (frequency === "daily") {
      occurrences.push(format(current, "yyyy-MM-dd"));
      current = addDays(current, interval);
    } else if (frequency === "weekly") {
      for (const day of weekDays) {
        const temp = new Date(current);
        const diff = (weekDayMap[day] + 7 - temp.getDay()) % 7;
        const nextDay = addDays(temp, diff);
        if (isBefore(nextDay, end)) {
          occurrences.push(format(nextDay, "yyyy-MM-dd"));
        }
      }
      current = addWeeks(current, interval);
    } else if (frequency === "monthly") {
      if (monthlyPattern) {
        const { week, day } = monthlyPattern;
        const temp = new Date(current);
        temp.setDate(1);
        const dayIndex = fullDayMap[day];

        const weeks = [];
        while (temp.getMonth() === current.getMonth()) {
          if (temp.getDay() === dayIndex) {
            weeks.push(new Date(temp));
          }
          temp.setDate(temp.getDate() + 1);
        }

        const targetWeek =
          week === "last" ? weeks[weeks.length - 1] : weeks[parseInt(week) - 1];

        if (targetWeek && isBefore(targetWeek, end)) {
          occurrences.push(format(targetWeek, "yyyy-MM-dd"));
        }
      } else {
        occurrences.push(format(current, "yyyy-MM-dd"));
      }
      current = addMonths(current, interval);
    } else if (frequency === "yearly") {
      occurrences.push(format(current, "yyyy-MM-dd"));
      current = addYears(current, interval);
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        Recurring Dates Preview
      </h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 max-h-60 overflow-y-auto">
        {occurrences.map((date, idx) => (
          <li key={idx}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarPreview;
