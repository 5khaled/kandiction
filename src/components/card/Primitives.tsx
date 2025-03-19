import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PrimitivesProps = {
  primitives: string[] | undefined;
  kanji: string | undefined;
  type: string;
};

function Primitives({ primitives, kanji, type }: PrimitivesProps) {
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [kanjis, setKanjis] = useState<string[]>();

  useEffect(() => {
    if (primitives) {
      setToggled(false);
      if (primitives.length > 0) {
        setKanjis(primitives.slice(0, 7));
      } else {
        if (kanji) {
          setKanjis([kanji]);
        }
      }

      if (primitives.length > 8) {
        setShowToggleButton(true);
      } else {
        setShowToggleButton(false);
      }
    }
  }, [primitives, kanji]);
  function handleToggle() {
    if (toggled) {
      setKanjis(primitives?.slice(0, 7));
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
        <section className="text-2xl max-sm:text-xl font-medium [&>*]:size-14 max-sm:[&>*]:size-12 scrollbar-primary gap-2 max-h-64 grid grid-cols-[repeat(4,auto)] content-start overflow-x-hidden pr-1 text-white">
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
          {showToggleButton && primitives && (
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

export default Primitives;
