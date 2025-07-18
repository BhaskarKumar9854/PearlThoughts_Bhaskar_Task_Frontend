"use client";

import { useState } from "react";
import { format } from "date-fns";
import CalendarPreview from "./ CalendarPreview"; // removed space typo

export default function RecurringDatePicker() {
  const [selectedDate, setSelectedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [interval, setInterval] = useState(1);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [monthlyPattern, setMonthlyPattern] = useState({
    week: "2",
    day: "Tuesday",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value);
  };

  const toggleWeekDay = (day: string) => {
    setWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">
        Recurring Date Picker
      </h2>

      <label className="block mb-2 font-bold text-gray-800">Start Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded-md text-black font-mediumbold"
      />

      <label className="block mb-2 font-bold text-gray-800">
        End Date (Optional):
      </label>
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded-md text-black font-mediumbold"
      />

      <label className="block mb-2 font-bold text-gray-800">Frequency:</label>
      <select
        value={frequency}
        onChange={handleFrequencyChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded-md text-black font-mediumbold"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label className="block mb-2 font-bold text-gray-800">Every:</label>
      <input
        type="number"
        min={1}
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        className="w-full p-2 mb-4 border border-gray-700 rounded-md text-black font-mediumbold"
      />

      {frequency === "weekly" && (
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800">
            Select Weekdays:
          </label>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <label
              key={day}
              className="inline-flex items-center mr-3 mb-1 text-gray-700 font-mediumbold"
            >
              <input
                type="checkbox"
                checked={weekDays.includes(day)}
                onChange={() => toggleWeekDay(day)}
                className="mr-1"
              />
              {day}
            </label>
          ))}
        </div>
      )}

      {frequency === "monthly" && (
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800">
            Monthly Pattern:
          </label>
          <div className="flex gap-2">
            <select
              value={monthlyPattern.week}
              onChange={(e) =>
                setMonthlyPattern({ ...monthlyPattern, week: e.target.value })
              }
              className="flex-1 p-2 border border-gray-300 rounded-md text-black font-semibold"
            >
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
              <option value="last">Last</option>
            </select>

            <select
              value={monthlyPattern.day}
              onChange={(e) =>
                setMonthlyPattern({ ...monthlyPattern, day: e.target.value })
              }
              className="flex-1 p-2 border border-gray-300 rounded-md text-black font-semibold"
            >
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {selectedDate && (
        <CalendarPreview
          startDate={selectedDate}
          endDate={endDate}
          frequency={frequency}
          interval={interval}
          weekDays={weekDays}
          monthlyPattern={monthlyPattern}
        />
      )}
    </div>
  );
}
