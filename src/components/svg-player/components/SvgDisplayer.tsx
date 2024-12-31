// import { CSSProperties, useEffect, useState } from "react";

// import { MutableRefObject } from "react";

// interface SvgDisplayerProps {
//   // size: number | "flexible";
//   SvgDisplayerRef: MutableRefObject<HTMLDivElement | null>;
// }

export function SvgDisplayer() {
  // const [canvasSize, setCanvasSize] = useState<CSSProperties>({});

  // useEffect(() => {
  //   if (size !== "flexible") {
  //     setCanvasSize({ width: `${size * 4}px`, height: `${size * 4}px` });
  //   }
  // }, [size]);
  return (
    <main
      // ref={SvgDisplayerRef}
      // style={canvasSize}
      className={`grow aspect-square relative z-0 bg-black bg-opacity-15 flex items-center justify-center`}
    >
      <GuideLinesSvg />
    </main>
  );
}

function GuideLinesSvg() {
  return (
    <svg
      className="absolute w-full h-full opacity-25 scale-75 -z-50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      stroke="white"
    >
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        strokeWidth="1"
        strokeDasharray="10,5"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        strokeWidth="1"
        strokeDasharray="10,5"
      />
    </svg>
  );
}
