import { useSvgPlayerStore } from "~/stores/SvgPlayerStore";

import SvgPlayerOptions from "./SvgPlayerOptions";
import SvgCanvas from "~/components/svg-player/SvgCanvas";
import TimelineSlider from "./TimelineSlider";
import SvgPlayerControls from "./SvgPlayerControls";

export default function SvgPlayer() {
  const { guideLines, svgContent } = useSvgPlayerStore();

  return (
    <main className="flex flex-col gap-1 max-w-75">
      <SvgPlayerOptions />
      <SvgCanvas svgContent={svgContent} guidelines={guideLines} autoPlay />
      <TimelineSlider />
      <SvgPlayerControls />
    </main>
  );
}
