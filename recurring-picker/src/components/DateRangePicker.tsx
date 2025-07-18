import { useRecurrenceStore } from "../store/recurrenceStore";

export default function DateRangePicker() {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block font-semibold mb-1">Start Date</label>
        <input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">End Date (Optional)</label>
        <input
          type="date"
          onChange={(e) =>
            setEndDate(e.target.value ? new Date(e.target.value) : null)
          }
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}
