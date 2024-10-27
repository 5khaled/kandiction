import PropTypes from "prop-types";

export default function Options({
  playAnimation,
  cancelAnimation,
  isAnimating,
  SvgHolder,
  strokeOrderToggled,
  setStrokeOrderToggled,
  manualToggleRef,
}) {
  function showStrokeOrder() {
    const SVG = SvgHolder.current.querySelector("svg");
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

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-start gap-1 bg-black p-1.5 opacity-0 group-hover:bg-opacity-10 group-hover:opacity-100">
      <button
        title={isAnimating ? "Cancel" : "Replay"}
        onClick={() => {
          isAnimating ? cancelAnimation() : playAnimation();
        }}
        className={`
          border border-transparent z-50 rounded bg-white p-2 text-white transition-transform bg-opacity-25 
          opacity-100 hover:bg-opacity-30
          `}
      >
        {isAnimating ? (
          <img src="/X_icon.svg" alt="Cancel" className={`size-4`} />
        ) : (
          <img
            src="/replay.svg"
            alt="Replay"
            className={`${isAnimating ? "opacity-50" : ""} size-4`}
          />
        )}
      </button>
      <button
        title="Toggle stroke order"
        onClick={() => {
          !isAnimating ? showStrokeOrder() : "";
        }}
        className={`
          z-50 rounded bg-white p-2 text-white transition-transform bg-opacity-25 
          ${isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-opacity-30"}
          ${strokeOrderToggled ? "border border-white border-opacity-75" : "border border-transparent"}
          `}
      >
        <img
          src="/order.svg"
          alt="Order"
          className={`${isAnimating ? "opacity-50" : ""} size-4`}
        />
      </button>
    </div>
  );
}

Options.propTypes = {
  playAnimation: PropTypes.func,
  cancelAnimation: PropTypes.func,
  isAnimating: PropTypes.bool,
  SvgHolder: PropTypes.object,
  strokeOrderToggled: PropTypes.bool,
  setStrokeOrderToggled: PropTypes.func,
  manualToggleRef: PropTypes.object,
};
