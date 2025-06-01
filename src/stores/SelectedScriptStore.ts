import { create } from "zustand";

import type { KanaType } from "../types/index";

interface SelectedScriptStore {
  selectedScript: KanaType;
  setSelectedScript: (type: KanaType) => void;
}

export const useSelectedScriptStore = create<SelectedScriptStore>((set) => ({
  selectedScript: "hiragana",
  setSelectedScript: (type) => set({ selectedScript: type }),
}));
