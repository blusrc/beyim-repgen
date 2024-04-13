import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

export interface DateRangeStore {
  dateRange: DateRange | undefined;
  setDateRange: (newRange: DateRange | undefined) => void;
}

// Create the Zustand store
const useDateRangeStore = create<DateRangeStore>((set) => ({
  dateRange: {
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  },
  setDateRange: (newRange) => set({ dateRange: newRange }),
}));

export default useDateRangeStore;
