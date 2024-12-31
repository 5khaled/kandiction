import { ReplayIcon } from "../icons/Replay_icon";
import { SkipAnimationIcon } from "../icons/SkipAnimation_icon";
import { SkipStrokeIcon } from "../icons/SkipStroke_icon";

interface ControlsProps {
  canvasSize: number | "flexible";
}

export function Controls({ canvasSize }: ControlsProps) {
  if (canvasSize === "flexible") {
    canvasSize = 90;
  }
  const iconSize = `${canvasSize / 2}px`;
  return (
    <div className="[container-type:inline-size] flex justify-evenly items-center opacity-80">
      <SkipAnimationIcon size={iconSize} direction="backward" />
      <SkipStrokeIcon size={iconSize} direction="backward" />
      <ReplayIcon size={iconSize} />
      <SkipStrokeIcon size={iconSize} />
      <SkipAnimationIcon size={iconSize} />
    </div>
  );
}
