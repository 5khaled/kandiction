import { Eye, EyeClosed, FileSpreadsheet, SquarePen, Cog } from "lucide-react";
import { cn } from "~/lib/utils";
import CanvasGrid from "../icons/canvas-grid";
import ButtonsGroup from "../primitives/ButtonsGroup";
import { Button } from "../shadcn/button";
import { useSVGAnimation, useSVGAnimationStore } from "~/hooks/useSVGAnimation";

import { useSvgPlayerStore } from "~/stores/SvgPlayerStore";

export default function SvgPlayerOptions() {
  const { SvgContainer, strokesOrderVisible } = useSVGAnimationStore();
  const { ToggleStrokesOrder } = useSVGAnimation();

  const { guideLines, toggleGuideLines } = useSvgPlayerStore();

  return (
    <section className="flex gap-x-1">
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
