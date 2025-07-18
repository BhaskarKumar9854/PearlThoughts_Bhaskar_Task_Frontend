// GOOD: relative path from current file
import { getRecurringDates } from "/project/workspace/recurring-picker/src/app/utils/dateUtils.ts";

test("generates correct daily recurrence", () => {
  const result = getRecurringDates(
    "2025-07-01",
    "2025-07-03",
    "daily",
    1,
    [],
    {}
  );
  expect(result).toEqual(["2025-07-01", "2025-07-02", "2025-07-03"]);
});
