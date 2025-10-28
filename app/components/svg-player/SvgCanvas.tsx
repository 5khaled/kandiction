import { useEffect, useRef } from "react";

import { useSVGAnimation, useSVGAnimationStore } from "~/hooks/useSVGAnimation";
import { cn } from "~/lib/utils";

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
}

export default function SvgCanvas({
  svgContent,
  guidelines = true,
  autoPlay = false,
  strokeWidth = 2.75,
}: SvgCanvasInterface) {
  const SvgHolder = useRef<HTMLDivElement | null>(null);

  const { setSvgContainer } = useSVGAnimationStore();
  const { PlayAnimation, Seek } = useSVGAnimation();

  useEffect(() => {
    if (SvgHolder.current && svgContent) {
      SvgHolder.current.innerHTML = svgContent;
      setSvgContainer(SvgHolder.current);
      if (autoPlay) {
        PlayAnimation(SvgHolder.current, { animationDelay: 500 });
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
      <div className="relative isolate w-full aspect-square bg-card dark:bg-ring rounded border dark:border-card">
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

interface CanvasGuideLinesInterface extends React.SVGProps<SVGSVGElement> {
  dash?: number;
  gap?: number;
  centerGap?: number;
  strokeWidth?: number;
  className?: string;
}

export function CanvasGuideLines({
  dash = 4,
  gap = 4,
  centerGap = 2,
  strokeWidth = 2,
  className,
  ...svgProps
}: CanvasGuideLinesInterface) {
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
