import { create } from "zustand";

/**
 * Global reference to the SVG.
 * Allows manipulation of the SVG from any component.
 */
interface SVGRefStore {
  svgRef: { current: HTMLDivElement | null };
}
export const useSVGRefStore = create<SVGRefStore>(() => ({
  svgRef: { current: null },
}));

/**
 * !! MOBILE !!
 * Controls minimized state for SVGPlayer and other UI components.
 * When true, elements shrink/collapse (player, button panels, etc.).
 */
interface IsMinimizedStore {
  isMinimized: boolean;
  setIsMinimized: (state: boolean) => void;
}
export const useIsMinimizedStore = create<IsMinimizedStore>((set) => ({
  isMinimized: false,
  setIsMinimized: (state) => set({ isMinimized: state }),
}));
