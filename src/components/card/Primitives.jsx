import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles/Primitives.css";

function Primitives({ primitives, kanji, type }) {
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [kanjis, setKanjis] = useState(null);

  useEffect(() => {
    if (primitives) {
      setToggled(false);
      primitives.length > 0
        ? setKanjis(primitives.slice(0, 7))
        : setKanjis([kanji]);
      primitives.length > 8
        ? setShowToggleButton(true)
        : setShowToggleButton(false);
    }
  }, [primitives, kanji]);
  function handleToggle() {
    if (toggled) {
      setKanjis(primitives.slice(0, 7));
      setToggled(false);
    } else {
      setKanjis(primitives);
      setToggled(true);
    }
  }

  return (
    <main className="flex flex-col gap-2">
      <header className="text-nowrap font-medium text-white">
        {type === "in" ? "Primitive in: " : "Primitives: "}(
        {kanjis ? primitives?.length : "0"})
      </header>
      {kanjis && (
        <section className="text-2xl max-sm:text-xl font-medium [&>*]:size-14 max-sm:[&>*]:size-12 scrollbar-hide gap-2 max-h-64 grid grid-cols-[repeat(4,auto)] content-start overflow-x-hidden pr-1 text-white">
          {kanjis.map((p, i) => (
            <Link
              to={`/kanji/${p}`}
              className={`group ${
                p === kanji
                  ? "bg-white bg-opacity-30 dark:bg-opacity-20 can-hover:hover:bg-opacity-40 dark:can-hover:hover:bg-opacity-30"
                  : "bg-black bg-opacity-35 dark:bg-opacity-25"
              } flex cursor-pointer items-center justify-center rounded border border-transparent can-hover:hover:border-white`}
              key={i}
            >
              <div className="can-hover:group-hover:scale-125 transition-transform">
                {p}
              </div>
            </Link>
          ))}
          {showToggleButton && (
            <button
              onClick={handleToggle}
              className="text-sm max-sm:text-xs flex cursor-pointer items-center justify-center rounded bg-white bg-opacity-30 dark:bg-opacity-20 can-hover:hover:bg-opacity-40 dark:can-hover:hover:bg-opacity-30 active:scale-95 transition-transform"
            >
              <div className="py-1.5">
                {toggled ? (
                  "Less"
                ) : (
                  <div>
                    More <br />({primitives?.length - 7})
                  </div>
                )}
              </div>
            </button>
          )}
        </section>
      )}
      {!kanjis && (
        <div className="text-white text-opacity-35 pl-2 select-none">
          - None
        </div>
      )}
    </main>
  );
}
Primitives.propTypes = {
  primitives: PropTypes.array,
  kanji: PropTypes.string,
  type: PropTypes.string,
};

export default Primitives;
