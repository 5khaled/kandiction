import { CSSProperties, useEffect, useState } from "react";
import { Controls } from "./components/Controls";
import { SvgDisplayer } from "./components/SvgDisplayer";

type canvasSizeType = number | "flexible";

interface svgPlayerProps {
  style?: "full" | "compact";
  canvasSize?: canvasSizeType;
}

export default function SvgPlayer({
  style = "full",
  canvasSize = 60
}: svgPlayerProps) {
  //
  const [svgPlayerStyle, setSvgPlayerStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (canvasSize === "flexible") {
      setSvgPlayerStyle({});
    } else {
      switch (style) {
        case "full":
          setSvgPlayerStyle({
            width: `${canvasSize * 4}px`,
            // height: `${canvasSize * 4}px`,
            padding: `${canvasSize / 4}px`,
            borderWidth: `${canvasSize / 60}px`
          });
          break;
        case "compact":
          setSvgPlayerStyle({
            width: `${canvasSize * 4}px`,
            borderWidth: `${canvasSize / 30}px`
          });
          break;
      }
    }
  }, [canvasSize, style]);

  return (
    <div
      style={svgPlayerStyle}
      className={`rounded aspect-square relative
        ${canvasSize === "flexible" ? "grow max-w-lg" : ""}
        ${canvasSize === "flexible" && style === "full" ? "p-6" : ""}
        ${style === "full" && "bg-black bg-opacity-15"}
        ${style === "compact" && "bg-black bg-opacity-20 border-2"}`}
    >
      <main className="relative flex flex-col">
        <SvgDisplayer />
        <footer
          className={`
            flex flex-col
            ${style === "compact" && "hidden"}`}
        >
          <SvgTimeline strokes={4} canvasSize={canvasSize} />
          <Controls canvasSize={canvasSize} />
        </footer>
      </main>
      <div className="absolute w-full text-center p-2 text-gray-200 font-light text-base">
        This is a placeholder for the Svg Player
        <div className="text-gray-300">(Not working yet)</div>
      </div>
    </div>
  );
}

interface SvgTimelineProps {
  strokes: number;
  canvasSize: canvasSizeType;
}
function SvgTimeline({ strokes, canvasSize }: SvgTimelineProps) {
  if (canvasSize === "flexible") {
    canvasSize = 90;
  }
  return (
    <div
      style={{ padding: canvasSize / 6, marginBlock: canvasSize / 6 }}
      className="[container-type:inline-size] flex items-center justify-center overflow-hidden"
    >
      <div
        style={{ height: canvasSize / 30 }}
        className="bg-black opacity-25 w-full flex justify-between px-2"
      >
        {[...Array(strokes + 1)].map((_, i) => (
          <div
            style={{
              width: canvasSize / 30,
              height: canvasSize / 7.5
            }}
            key={i}
            className="bg-black relative -translate-y-1/2 top-1/2"
          ></div>
        ))}
      </div>
    </div>
  );
}
