import { memo } from "react";

import { cn } from "@utils/utils";

import SvgDisplayer from "./components/SvgDisplayer";

interface svgPlayerProps {
  canvasSize?: string | number;
  guideLines?: boolean;
  className?: string;
}

const SvgPlayer = ({ canvasSize, guideLines, className }: svgPlayerProps) => {
  return (
    <main
      style={{ width: canvasSize, height: canvasSize }}
      className={cn(`relative group`, className)}
    >
      <SvgDisplayer guideLines={guideLines} />
    </main>
  );
};

const MemoizedSvgPlayer = memo(SvgPlayer);

export default MemoizedSvgPlayer;
