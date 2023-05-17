import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CalculatorState {
  firstValue: string;
  secondValue: string;
  operator: string | null;
  mode: boolean;
  blink: boolean;
  updateFirstValue: (firstValue: string) => void;
  updateSecondValue: (secondValue: string) => void;
  updateOperator: (operator: string | null) => void;
  updateBlink: (blink: boolean) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      firstValue: "0",
      secondValue: "0",
      operator: null,
      mode: true,
      blink: true,
      updateFirstValue: (firstValue) => set({ firstValue, mode: true }),
      updateSecondValue: (secondValue) => set({ secondValue, mode: false }),
      updateOperator: (operator) => set({ operator }),
      updateBlink: (blink) => set({ blink }),
    }),
    {
      name: "calculator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
