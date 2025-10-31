import {
  StepBack,
  Pause,
  Play,
  StepForward,
  SkipForward,
  SkipBack,
} from "lucide-react";
import ButtonsGroup from "../primitives/ButtonsGroup";
import { Button } from "../shadcn/button";
import { useSVGAnimation, useSVGAnimationStore } from "~/hooks/useSVGAnimation";

export default function SvgPlayerControls() {
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
    <ButtonsGroup>
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
