import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Readings({ readings, type }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(type === "kun" ? "Kunyomi: " : "Onyomi: ");
  }, [type]);
  return (
    <main className="flex flex-col gap-1">
      <header className="font-bold text-white text-nowrap basis-full">
        {title}
      </header>
      {readings && (
        <section className="flex flex-wrap gap-0.5">
          {readings.split("、").map((r, i) => (
            <div
              className=" bg-black bg-opacity-15 dark:bg-opacity-10 can-hover:hover:bg-opacity-25 dark:can-hover:hover:bg-opacity-20 text-white max-sm:text-sm rounded-md py-1 px-3 max-sm:py-1 max-sm:px-2 transition-colors"
              key={i}
            >
              {r}
            </div>
          ))}
        </section>
      )}
      {!readings && (
        <div className="text-white text-opacity-35 pl-2 select-none">
          - None
        </div>
      )}
    </main>
  );
}

export default Readings;

Readings.propTypes = {
  readings: PropTypes.string,
  type: PropTypes.string,
};
