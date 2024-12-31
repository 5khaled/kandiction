import { create } from "zustand";

type KanaOptionStore = {
  selectedOption: "hiragana" | "katakana";
  setSelectedOption: (type: "hiragana" | "katakana") => void;
};

export const useKanaOption = create<KanaOptionStore>((set) => ({
  selectedOption: "hiragana",
  setSelectedOption: (type) => set({ selectedOption: type })
}));
