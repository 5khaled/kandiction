import { useEffect, useRef } from "react";

import { useSVGRefStore } from "@stores/SVGPlayerStore";

import { useSVGAnimation } from "@hooks/animation/useSVGAnimation";
import { useSVGFetch } from "@hooks/general/useSVGFetch";

import { quantum } from "ldrs";

quantum.register();

export default function SvgDisplayer({ guideLines }: { guideLines?: boolean }) {
  const CHARACTER = "雨";
  const SVG_SOURCE = `https://kanji.vwh.sh/svg/${CHARACTER.codePointAt(0)?.toString(16).padStart(5, "0")}.svg`;

  const { svgContent, isLoading, isError } = useSVGFetch(SVG_SOURCE);

  const { playAnimation } = useSVGAnimation();

  const SvgHolder = useRef<HTMLDivElement>(null);
  const { svgRef } = useSVGRefStore();
  useEffect(() => {
    if (svgContent) {
      svgRef.current = SvgHolder.current;
      playAnimation(svgRef.current);
    }
  }, [svgRef, playAnimation, svgContent]);

  return (
    <main className={`size-full relative z-0 flex items-center justify-center`}>
      {isLoading && <l-quantum color={"white"} speed={2} size={50} />}
      {isError && !isLoading && <NoSVG Char={CHARACTER} />}
      {svgContent && !isLoading && !isError && (
        <>
          <div
            ref={SvgHolder}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className={`
              absolute size-full select-none color-scheme-light z-10 scale-90 
              [&>svg]:size-full [&_path]:stroke-white [&_text]:fill-white [&_text]:text-2xs
              `}
          />
        </>
      )}
      {guideLines && !isLoading && <GuideLinesSvg />}
    </main>
  );
}

function GuideLinesSvg() {
  return (
    <svg
      className="absolute top-0 left-0 size-full h-full opacity-25 scale-75 -z-50"
      viewBox="0 0 100 100"
      stroke="white"
    >
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        strokeWidth="0.5"
        strokeDasharray="10,5"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        strokeWidth="0.5"
        strokeDasharray="10,5"
      />
    </svg>
  );
}

function NoSVG({ Char }: { Char: string }) {
  return (
    <figure className="[container-type:inline-size] size-full flex flex-col justify-around items-center">
      <span className="text-[30cqi] leading-none text-white">({Char})</span>
      <div className="text-white text-opacity-50 text-[8cqi]">
        No SVG available!
      </div>
    </figure>
  );
}
