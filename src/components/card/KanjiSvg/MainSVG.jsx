import PropTypes from "prop-types";
import { useEffect } from "react";

export default function MainSVG({
  svgContent,
  SvgHolder,
  playAnimation,
  cancelAnimation,
}) {
  useEffect(() => {
    // Cancel the previous animation (Cleaing up all setTimeouts from the previous animation)
    // Then the new animation starts with conflicting with the previous one
    cancelAnimation();
    playAnimation();
  }, [playAnimation, cancelAnimation]);
  return (
    svgContent && (
      <div
        ref={SvgHolder}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className={`
          w-full select-none rounded color-scheme-light z-10
          [&>svg]:size-full [&_path]:stroke-white [&_text]:fill-slate-300 [&_text]:text-2xs [&_text]:hidden`}
      />
    )
  );
}
MainSVG.propTypes = {
  svgContent: PropTypes.string,
  SvgHolder: PropTypes.object,
  playAnimation: PropTypes.func,
  cancelAnimation: PropTypes.func,
};
