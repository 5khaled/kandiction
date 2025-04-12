import { useCallback, useEffect } from "react";
import { create } from "zustand";

interface SVGAnimationStore {
  isAnimating: boolean;
  strokesOrderVisible: boolean;
  timeoutIDs: number[];

  setIsAnimating: (state: boolean) => void;
  setStrokesOrderVisible: (state: boolean) => void;
  addTimeoutId: (id: number) => void;
  clearTimeouts: () => void;
}

export const useSVGAnimationStore = create<SVGAnimationStore>((set) => ({
  isAnimating: false,
  strokesOrderVisible: true,
  timeoutIDs: [],

  setIsAnimating: (state) => set({ isAnimating: state }),
  setStrokesOrderVisible: (state) => set({ strokesOrderVisible: state }),

  addTimeoutId: (id) =>
    set((state) => {
      state.timeoutIDs.push(id);
      return {};
    }),

  clearTimeouts: () =>
    set((state) => {
      state.timeoutIDs.forEach(clearTimeout);
      state.timeoutIDs = [];
      return {};
    }),
}));

export function useSVGAnimation() {
  const {
    setIsAnimating,
    addTimeoutId,
    clearTimeouts,
    strokesOrderVisible,
    setStrokesOrderVisible,
  } = useSVGAnimationStore();

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      clearTimeouts();
      setIsAnimating(false);
    };
  }, [clearTimeouts, setIsAnimating]);

  interface AnimationOptions {
    animationDelay?: number;
    drawDuration?: number;
    transitionTiming?:
      | "ease"
      | "linear"
      | "ease-in"
      | "ease-out"
      | "ease-in-out";
  }
  const playAnimation = useCallback(
    (SvgHolder: HTMLDivElement | null, options?: AnimationOptions) => {
      const {
        animationDelay = 1000, // A delay in (MS) before the whole animation starts
        drawDuration = 1000, // Draw duration for each stroke in (MS) per 100 user units
        transitionTiming = "linear",
      } = options ?? {};

      setIsAnimating(true);
      if (SvgHolder) {
        const SVG = SvgHolder.querySelector("svg");
        if (SVG) {
          const paths = SVG.querySelectorAll("path");
          const texts = SVG.querySelectorAll("text");
          paths.forEach((path, index) => {
            path.style.transition = "initial";
            texts[index].style.opacity = "0.1";
          });

          // Animate each stroke
          let totalStrokesDuration = 0;
          paths.forEach((path, index) => {
            const currentStrokeDuration =
              (path.getTotalLength() / 100) * drawDuration;

            path.style.strokeDashoffset = `${path.getTotalLength()}`;
            path.style.strokeDasharray = `${path.getTotalLength()}`;

            const timeoutId = setTimeout(() => {
              texts[index].style.opacity = "1";
              path.style.transition = `stroke-dashoffset ${currentStrokeDuration}ms ${transitionTiming}`;
              path.style.strokeDashoffset = `${0}`;
            }, totalStrokesDuration + animationDelay);
            addTimeoutId(timeoutId); // Store timeout ID

            totalStrokesDuration = totalStrokesDuration + currentStrokeDuration;
          });

          // End of animation
          const endAnimationTimeoutId = setTimeout(() => {
            setIsAnimating(false);
          }, totalStrokesDuration + animationDelay);

          addTimeoutId(endAnimationTimeoutId); // Store final timeout ID
        }
      }
    },
    [setIsAnimating, addTimeoutId],
  );

  const cancelAnimation = useCallback(
    (SvgHolder: HTMLDivElement | null) => {
      if (SvgHolder) {
        const SVG = SvgHolder.querySelector("svg");
        if (SVG) {
          const paths = SVG.querySelectorAll("path");
          const texts = SVG.querySelectorAll("text");

          paths.forEach((path) => {
            path.style.transition = "none";
            path.style.strokeDashoffset = `${0}`;
          });

          texts.forEach((text) => {
            text.style.opacity = "1";
          });

          clearTimeouts();
          setIsAnimating(false);
        }
      }
    },
    [setIsAnimating, clearTimeouts],
  );

  const toggleStrokesOrder = useCallback(
    (SvgHolder: HTMLDivElement | null) => {
      if (SvgHolder) {
        const SVG = SvgHolder.querySelector("svg");
        if (SVG) {
          const texts = SVG.querySelectorAll("text");

          if (strokesOrderVisible) {
            texts.forEach((text) => {
              text.style.display = "none";
              setStrokesOrderVisible(false);
            });
          } else {
            texts.forEach((text) => {
              text.style.display = "block";
              setStrokesOrderVisible(true);
            });
          }
        }
      }
    },
    [setStrokesOrderVisible, strokesOrderVisible],
  );

  return { playAnimation, cancelAnimation, toggleStrokesOrder };
}
