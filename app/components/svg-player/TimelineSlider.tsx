import { useEffect, useRef, useMemo } from "react";
import { cn } from "~/lib/utils";
import { useSVGAnimation, useSVGAnimationStore } from "~/hooks/useSVGAnimation";
import { useSvgPlayerStore } from "~/stores/SvgPlayerStore";

export default function TimelineSlider() {
  const { SvgContainer, isAnimating, totalUnits, currentUnit, pathMetas } =
    useSVGAnimationStore();
  const { PauseAnimation, ResumeAnimation, Seek } = useSVGAnimation();

  const wasAnimatingRef = useRef(false);

  const totalUnitsRounded = Math.max(1, Math.round(totalUnits));

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const val = Number((e.target as HTMLInputElement).value);
    if (SvgContainer?.current && Seek) {
      Seek(SvgContainer.current, val);
    }
  }

  function handlePointerDown() {
    wasAnimatingRef.current = isAnimating;
    if (isAnimating && PauseAnimation) {
      PauseAnimation();
    }
  }

  function handlePointerUp() {
    if (wasAnimatingRef.current && ResumeAnimation && SvgContainer?.current) {
      ResumeAnimation(SvgContainer.current);
      wasAnimatingRef.current = false;
    }
  }

  const progressPercentage =
    totalUnits > 0 ? (currentUnit / totalUnits) * 100 : 0;

  const { svgContent } = useSvgPlayerStore();

  const container = SvgContainer?.current;

  useEffect(() => {
    if (container && svgContent) {
      Seek(container, 0);
    }
  }, [container, svgContent, Seek]);

  return (
    <div className="flex flex-col gap-1 bg-ring p-px rounded">
      <div
        className={cn(
          `[--x-padding:calc(var(--spacing)*3)] [--slider-color:var(--color-primary)]`,
          `group isolate relative bg-card flex rounded-[calc(var(--radius)-1px)] border`,
        )}
      >
        {/* Path chunks representing actual path durations */}

        <input
          type="range"
          min={0}
          max={totalUnitsRounded}
          value={currentUnit}
          onInput={handleInput}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          disabled={!container}
          className={cn(
            `mx-(--x-padding) disabled:opacity-0 transition-opacity duration-300 z-10`,
            "relative w-full h-7 appearance-none rounded cursor-pointer focus-visible:outline-0",
            [
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:shadow-none",
              "[&::-webkit-slider-thumb]:bg-(--slider-color)",
              "[&::-webkit-slider-thumb]:rounded-xs",
              "pointer-coarse:active:[&::-webkit-slider-thumb]:rounded",
              "[&::-webkit-slider-thumb]:size-2",
              "peer-has-[:hover]:[&::-webkit-slider-thumb]:size-4",
              "active:[&::-webkit-slider-thumb]:size-2.5",
              "pointer-coarse:active:[&::-webkit-slider-thumb]:size-5",
              "[&::-webkit-slider-thumb]:outline-foreground",
              "focus-visible:[&::-webkit-slider-thumb]:outline",
              "[&::-moz-range-thumb]:appearance-none",
              "[&::-moz-range-thumb]:shadow-none",
              "[&::-moz-range-thumb]:bg-(--slider-color)",
              "[&::-moz-range-thumb]:rounded-xs",
              "[&::-moz-range-thumb]:border-0",
              "[&::-moz-range-thumb]:size-2",
              "active:[&::-moz-range-thumb]:size-2.5",
              "pointer-coarse:active:[&::-moz-range-thumb]:size-5",
              "[&::-moz-range-thumb]:outline-foreground",
              "focus-visible:[&::-moz-range-thumb]:outline",
            ],
          )}
        />
        <span className="absolute h-1 inset-x-(--x-padding) top-1/2 -translate-y-1/2 bg-disabled rounded" />
        <span
          className={cn(
            `absolute h-1 inset-x-(--x-padding) top-1/2 -translate-y-1/2 rounded`,
            `bg-linear-to-r from-(--slider-color) to-transparent`,
          )}
          style={
            {
              "--tw-gradient-to-position": `${progressPercentage}%`,
              "--tw-gradient-from-position": `${progressPercentage}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
