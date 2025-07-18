import { useRecurrenceStore } from "./store/recurrenceStore";

const options = ["daily", "weekly", "monthly", "yearly"] as const;

export default function FrequencySelector() {
  const { frequency, setFrequency } = useRecurrenceStore();

  return (
    <div className="flex gap-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setFrequency(opt)}
          className={`px-4 py-2 rounded ${
            frequency === opt ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
