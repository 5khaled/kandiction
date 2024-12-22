import { MutableRefObject } from "react";

type OptionsProps = {
  playAnimation: () => void;
  cancelAnimation: () => void;
  isAnimating: boolean;
  SvgHolder: MutableRefObject<HTMLDivElement | null>;
  strokeOrderToggled: boolean;
  setStrokeOrderToggled: React.Dispatch<React.SetStateAction<boolean>>;
  manualToggleRef: React.MutableRefObject<boolean>;
};

export default function Options({
  playAnimation,
  cancelAnimation,
  isAnimating,
  SvgHolder,
  strokeOrderToggled,
  setStrokeOrderToggled,
  manualToggleRef
}: OptionsProps) {
  function showStrokeOrder() {
    const SVG = SvgHolder.current?.querySelector("svg");
    if (SVG) {
      const texts = SVG.querySelectorAll("text");

      if (strokeOrderToggled) {
        texts.forEach((text) => {
          text.style.display = "none";
          setStrokeOrderToggled(false);
          manualToggleRef.current = false;
        });
      } else {
        texts.forEach((text) => {
          text.style.display = "block";
          setStrokeOrderToggled(true);
          manualToggleRef.current = true;
        });
      }
    }
  }

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-start gap-1 bg-black p-1.5 opacity-0 group-hover:bg-opacity-10 group-hover:opacity-100">
      <button
        title={isAnimating ? "Cancel" : "Replay"}
        onClick={() => {
          if (isAnimating) {
            cancelAnimation();
          } else {
            playAnimation();
          }
        }}
        className={`
          border border-transparent z-50 rounded bg-white p-2 text-white transition-transform bg-opacity-25 dark:bg-opacity-15
          opacity-100 can-hover:hover:bg-opacity-30 dark:can-hover:hover:bg-opacity-20
          `}
      >
        {isAnimating ? (
          <img
            src="/X_icon.svg"
            alt="Cancel"
            className={`size-4 pointer-events-none select-none`}
          />
        ) : (
          <img
            src="/replay.svg"
            alt="Replay"
            className={`size-4 pointer-events-none select-none ${
              isAnimating ? "opacity-50" : ""
            }`}
          />
        )}
      </button>
      <button
        title="Toggle stroke order"
        onClick={() => {
          if (!isAnimating) {
            showStrokeOrder();
          }
        }}
        className={`
          z-50 rounded bg-white p-2 text-white transition-transform bg-opacity-25 dark:bg-opacity-15
          ${
            isAnimating
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 can-hover:hover:bg-opacity-30 dark:can-hover:hover:bg-opacity-20"
          }
          ${
            strokeOrderToggled
              ? "border border-white border-opacity-75"
              : "border border-transparent"
          }
          `}
      >
        <img
          src="/order.svg"
          alt="Order"
          className={`size-4 pointer-events-none select-none ${
            isAnimating ? "opacity-50" : ""
          }`}
        />
      </button>
    </div>
  );
}
