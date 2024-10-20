import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

import MainSVG from "./MainSVG.jsx";
import PlaceHolderSVG from "./PlaceHolderSVG.jsx";
import Options from "./Options.jsx";

import Loader from "../../../assets/Loader.jsx";

export default function KanjiSvg({ KANJI }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const SvgHolder = useRef();

  const [svgContent, setSvgContent] = useState(null);
  // const SVG_SOURCE = VALID_KANJIS.includes(KANJI)
  //   ? `https://kanji.vwh.sh/svg/${KANJI.codePointAt(0).toString(16).padStart(5, "0")}.svg`
  //   : null;

  const SVG_SOURCE = `https://kanji.vwh.sh/svg/${KANJI.codePointAt(0).toString(16).padStart(5, "0")}.svg`;
  useEffect(() => {
    setIsLoading(true);
    // Fetch the SVG file
    const fetchSvg = async () => {
      try {
        const response = await fetch(SVG_SOURCE);
        const svgText = await response.text();

        // Extract the <svg> content using a regular expression
        const svgOnly = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[0];

        if (svgOnly) {
          setSvgContent(svgOnly);
        } else {
          console.error("SVG content not found");
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
      setIsLoading(false);
    };
    fetchSvg();
  }, [SVG_SOURCE]);

  const [strokeOrderToggled, setStrokeOrderToggled] = useState(false);
  const manualToggleRef = useRef(false); // Tracks manual toggle state
  const [isAnimating, setIsAnimating] = useState(false);

  const playAnimation = useCallback(() => {
    setIsAnimating(true);
    const SVG = SvgHolder.current?.querySelector("svg");
    if (SVG) {
      const paths = SVG.querySelectorAll("path");
      const texts = SVG.querySelectorAll("text");
      paths.forEach((path, index) => {
        path.style.transition = "none";
        texts[index].style.display = "none";
      });
      const strokeDuration = 0.4; // (Seconds)
      const animationDelay = 1000; // MS

      setTimeout(() => {
        //Animate each stroke
        paths.forEach((path, index) => {
          path.style.strokeDashoffset = path.getTotalLength();
          path.style.strokeDasharray = path.getTotalLength();
          setTimeout(() => {
            path.style.transition = `stroke-dashoffset ${strokeDuration}s ease ${index * strokeDuration}s`;
            path.style.strokeDashoffset = 0;
          }, animationDelay);
        });
      }, 0);
      // Show Stroke order number while each stroke being animated
      texts.forEach((text, index) => {
        setTimeout(
          () => {
            text.style.display = "block";
          },
          animationDelay + strokeDuration * animationDelay * index,
        );
      });
      // Hide Strokes order (<text> tags) after animation is finished
      setTimeout(
        () => {
          if (!manualToggleRef.current) {
            texts.forEach((text) => {
              text.style.display = "none";
            });
          }
          setIsAnimating(false);
        },
        animationDelay + strokeDuration * animationDelay * paths.length,
      );
    }
  }, []);

  return (
    <div className="group relative p-3 size-52 aspect-square max-sm:size-40 max-2xs:size-full shrink-0 rounded border-2 bg-black bg-opacity-35 flex items-center justify-center">
      {isLoading && <Loader className="" />}
      {isError && !isLoading && <NoSVG KANJI={KANJI} />}
      {!isLoading && !isError && (
        <>
          <Options
            playAnimation={playAnimation}
            isAnimating={isAnimating}
            SvgHolder={SvgHolder}
            strokeOrderToggled={strokeOrderToggled}
            setStrokeOrderToggled={setStrokeOrderToggled}
            manualToggleRef={manualToggleRef}
          />
          <figure className=" relative size-full flex items-center justify-center [&>*]:size-full">
            <MainSVG
              SvgHolder={SvgHolder}
              svgContent={svgContent}
              playAnimation={playAnimation}
              strokeOrderToggled={strokeOrderToggled}
            />
            <PlaceHolderSVG svgContent={svgContent} />
          </figure>
        </>
      )}
    </div>
  );
}
KanjiSvg.propTypes = {
  svgSource: PropTypes.string,
  KANJI: PropTypes.string,
};

function NoSVG({ KANJI }) {
  return (
    <figure className="[container-type:inline-size] size-full flex flex-col justify-around items-center">
      <span className="text-[40cqi] leading-none text-white">{KANJI}</span>
      <span className="text-white text-opacity-50 text-[8cqi]">
        No SVG available!
      </span>
    </figure>
  );
}
NoSVG.propTypes = {
  KANJI: PropTypes.string,
};
