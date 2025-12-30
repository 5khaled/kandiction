import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

import { useSVGAnimation, useSVGAnimationStore } from "~/hooks/useSVGAnimation";
import { useSvgPlayerStore } from "~/stores/SvgPlayerStore";

import ButtonsGroup from "../primitives/ButtonsGroup";
import { Button } from "../shadcn/button";

import {
  Eye,
  EyeClosed,
  FileSpreadsheet,
  SquarePen,
  Cog,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
} from "lucide-react";

import CanvasGrid from "../icons/canvas-grid";

interface SvgPlayerProps extends React.ComponentProps<"main"> {}

export default function SvgPlayer({
  className,
  children,
  ...props
}: SvgPlayerProps) {
  return (
    <main className={cn(`flex flex-col gap-1`, className)} {...props}>
      {children}
    </main>
  );
}

interface SvgCanvasInterface {
  svgContent: string | null;
  guidelines?: boolean;
  autoPlay?: boolean;
  /**
   * Stroke width percentage for SVG paths.
   *
   * Suggested values: 1.0 to 5.0
   *
   * Any number is accepted, but values between 1-5 work best.
   * @default 2.75
   */
  strokeWidth?: 1 | 2 | 3 | 4 | 5 | (number & {});
  className?: string;
}

export function SvgCanvas({
  svgContent,
  guidelines = true,
  autoPlay = false,
  strokeWidth = 2.75,
  className,
}: SvgCanvasInterface) {
  const SvgHolder = useRef<HTMLDivElement | null>(null);

  const { setSvgContainer } = useSVGAnimationStore();
  const { PlayAnimation, Seek } = useSVGAnimation();

  useEffect(() => {
    if (SvgHolder.current && svgContent) {
      SvgHolder.current.innerHTML = svgContent;
      setSvgContainer(SvgHolder.current);
      if (autoPlay) {
        PlayAnimation(SvgHolder.current, {
          animationDelay: 500,
        });
      } else {
        // seek to 0 to initialize metas and compute totalUnits
        Seek(SvgHolder.current, 0);
        // Wait for the next frame to ensure metas are computed and stored
        requestAnimationFrame(() => {
          const store = useSVGAnimationStore.getState();
          if (store.totalUnits > 0) {
            Seek(SvgHolder.current!, store.totalUnits);
          }
        });
      }
    }
  }, [svgContent, setSvgContainer, PlayAnimation, Seek]);

  return (
    <>
      <div className={cn(`relative isolate size-full`, className)}>
        {guidelines && (
          <CanvasGuideLines className="absolute inset-0 -z-50 stroke-disabled dark:stroke-card m-[8.335%]" />
        )}
        {svgContent ? (
          <main
            className="absolute inset-0 animate-in fade-in duration-300"
            style={{ "--stroke-w": `${strokeWidth}%` } as React.CSSProperties}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className={cn(
                `absolute inset-0 select-none color-scheme-light z-10 p-[8.335%]
                [&>svg]:size-full [&_path]:stroke-(length:--stroke-w) [&_path]:stroke-ring [&_text]:hidden font-mono font-bold`,
              )}
            />
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className={cn(
                `absolute inset-0 select-none color-scheme-light z-10 p-[8.335%] dark:opacity-25
                [&>svg]:size-full [&_path]:stroke-(length:--stroke-w) [&_path]:stroke-disabled [&_text]:hidden font-mono font-bold`,
              )}
            />
            <div
              ref={SvgHolder}
              className={cn(`absolute inset-0 select-none color-scheme-light z-10 p-[8.335%]
                [&>svg]:size-full [&_path]:stroke-(length:--stroke-w) [&_path]:stroke-primary [&_text]:text-[0.5rem] font-mono font-bold`)}
            />
          </main>
        ) : (
          <div className="size-full flex items-center justify-center text-base text-secondary-foreground font-light">
            No SVG Found
          </div>
        )}
      </div>
    </>
  );
}

export function CanvasGuideLines({
  dash = 4,
  gap = 4,
  centerGap = 2,
  strokeWidth = 1,
  className,
  ...svgProps
}: React.SVGProps<SVGSVGElement> & {
  dash?: number;
  gap?: number;
  centerGap?: number;
  strokeWidth?: number;
}) {
  const half = 50;
  const dashArray = `${dash} ${gap}`;

  // center gap endpoints
  const leftEnd = half - centerGap / 2;
  const rightStart = half + centerGap / 2;
  const topEnd = half - centerGap / 2;
  const bottomStart = half + centerGap / 2;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      strokeWidth={strokeWidth}
      className={className}
      {...svgProps}
    >
      {/* horizontal */}
      <line
        x1={leftEnd}
        y1={half}
        x2="0"
        y2={half}
        strokeDasharray={dashArray}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={rightStart}
        y1={half}
        x2="100"
        y2={half}
        strokeDasharray={dashArray}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
      />

      {/* vertical */}
      <line
        x1={half}
        y1={topEnd}
        x2={half}
        y2="0"
        strokeDasharray={dashArray}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={half}
        y1={bottomStart}
        x2={half}
        y2="100"
        strokeDasharray={dashArray}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SvgPlayerOptions({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const { SvgContainer, strokesOrderVisible } = useSVGAnimationStore();
  const { ToggleStrokesOrder } = useSVGAnimation();

  const { guideLines, toggleGuideLines } = useSvgPlayerStore();

  return (
    <section className={cn(`flex gap-x-1`, className)} {...props}>
      <ButtonsGroup className="">
        <Button
          variant={"secondary"}
          size={"icon"}
          disabled={SvgContainer ? false : true}
          onClick={() => {
            console.log(SvgContainer.current);

            if (SvgContainer.current) {
              ToggleStrokesOrder(SvgContainer.current);
            }
          }}
        >
          {strokesOrderVisible ? <Eye /> : <EyeClosed />}
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => {
            toggleGuideLines();
          }}
        >
          <CanvasGrid
            className={cn({
              "*:last:text-current/25!": !guideLines,
            })}
          />
        </Button>
        <Button disabled variant={"secondary"} size={"icon"}>
          <FileSpreadsheet />
        </Button>
        <Button disabled variant={"secondary"} size={"icon"}>
          <SquarePen />
        </Button>
      </ButtonsGroup>
      <Button disabled variant={"secondary"} className="grow">
        <div className="flex items-center justify-between grow">
          <Cog />
          <span className="grow">Options</span>
        </div>
      </Button>
    </section>
  );
}

export function TimelineSlider({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    <div
      className={cn(`flex flex-col gap-1 bg-ring p-px rounded`, className)}
      {...props}
    >
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

export function SvgPlayerControls({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { SvgContainer, isAnimating, totalUnits, currentUnit, pathMetas } =
    useSVGAnimationStore();

  const { PlayAnimation, PauseAnimation, ResumeAnimation, Seek } =
    useSVGAnimation();

  const container = SvgContainer?.current;

  const totalUnitsRounded = Math.max(0, Math.round(totalUnits));
  const currentUnitRounded = Math.max(0, Math.round(currentUnit));
  const isComplete =
    totalUnitsRounded > 0 && currentUnitRounded >= totalUnitsRounded;
  const hasProgress = currentUnitRounded > 0 && !isComplete;

  // Helper to find current path index
  const getCurrentPathIndex = () => {
    if (!pathMetas) return -1;
    return pathMetas.findIndex(
      (meta) => currentUnit >= meta.unitStart && currentUnit < meta.unitEnd,
    );
  };

  const canStepBackward = (() => {
    if (!pathMetas?.length) return false;
    const currentPathIndex = getCurrentPathIndex();
    // Can step back if we're not on the first path, or if we're past the start
    return currentPathIndex > 0 || (currentPathIndex === -1 && currentUnit > 0);
  })();

  const canStepForward = (() => {
    if (!pathMetas?.length) return false;
    // Can step forward if we haven't reached the end
    return currentUnit < totalUnits;
  })();

  const handleStepBackward = () => {
    if (!container || !pathMetas) return;

    const currentPathIndex = getCurrentPathIndex();

    if (currentPathIndex > 0) {
      // Jump to previous path
      Seek(container, pathMetas[currentPathIndex - 1].unitStart);
    } else if (currentPathIndex === -1 && currentUnit > 0) {
      // We're between paths or at the end, find the last path before current position
      const prevPath = pathMetas
        .slice()
        .reverse()
        .find((meta) => meta.unitEnd <= currentUnit);
      if (prevPath) {
        Seek(container, prevPath.unitStart);
      }
    }
  };

  const handleStepForward = () => {
    if (!container || !pathMetas) return;

    const currentPathIndex = getCurrentPathIndex();

    if (currentPathIndex !== -1 && currentPathIndex < pathMetas.length - 1) {
      // Jump to next path
      Seek(container, pathMetas[currentPathIndex + 1].unitStart);
    } else if (currentPathIndex === pathMetas.length - 1) {
      // We're on the last path, complete the animation
      Seek(container, totalUnits);
    } else if (currentPathIndex === -1) {
      // We're between paths, find the next one
      const nextPath = pathMetas.find((meta) => meta.unitStart > currentUnit);
      if (nextPath) {
        Seek(container, nextPath.unitStart);
      }
    }
  };

  return (
    <ButtonsGroup className={cn(className)} {...props}>
      <Button
        disabled={!container || !canStepBackward}
        variant={"secondary"}
        size={"icon"}
        className="grow justify-start px-3"
        onClick={() => {
          Seek(container!, 0);
        }}
      >
        <SkipBack />
      </Button>
      <Button
        variant={"secondary"}
        size={"icon"}
        disabled={!container || !canStepBackward}
        onClick={handleStepBackward}
      >
        <StepBack />
      </Button>
      <Button
        variant={"secondary"}
        size={"icon"}
        disabled={!container}
        onClick={() => {
          if (!container) return;

          if (isAnimating) {
            PauseAnimation();
            return;
          }

          if (hasProgress) {
            ResumeAnimation(container);
            return;
          }

          PlayAnimation(container);
        }}
      >
        {isAnimating ? <Pause className="fill-current! stroke-0" /> : <Play />}
      </Button>
      <Button
        variant={"secondary"}
        size={"icon"}
        disabled={!container || !canStepForward}
        onClick={handleStepForward}
      >
        <StepForward />
      </Button>
      <Button
        disabled={!container || !canStepForward}
        variant={"secondary"}
        size={"icon"}
        className="grow justify-end px-3"
        onClick={() => {
          Seek(container!, totalUnits);
        }}
      >
        <SkipForward />
      </Button>
    </ButtonsGroup>
  );
}
