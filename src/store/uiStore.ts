import { create } from "zustand";

interface UIDarkModeState {
  isDarkMode: boolean;
}

interface UIToggleDarkModeAction {
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIDarkModeState & UIToggleDarkModeAction>(
  (
    set: (
      fn: (
        state: UIDarkModeState & UIToggleDarkModeAction
      ) => Partial<UIDarkModeState>
    ) => void
  ) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  })
);
