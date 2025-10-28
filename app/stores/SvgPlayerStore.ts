import { create } from "zustand";

interface SvgPlayerState {
  guideLines: boolean;
  setGuideLines: (guideLines: boolean) => void;
  toggleGuideLines: () => void;

  svgContent: string | null;
  setSvgContent: (svgContent: string) => void;
}

export const useSvgPlayerStore = create<SvgPlayerState>((set) => ({
  guideLines: true,
  setGuideLines: (guideLines) => set({ guideLines }),
  toggleGuideLines: () => set((state) => ({ guideLines: !state.guideLines })),

  svgContent: null,
  setSvgContent: (svgContent) => set({ svgContent }),
}));
