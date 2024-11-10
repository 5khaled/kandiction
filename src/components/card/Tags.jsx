import PropTypes from "prop-types";

function KanjiTags({ tags }) {
  const Titles = {
    jlpt: "JLPT",
    grade: "Grade",
    strokes: "Strokes",
    radical: "Radical",
  };

  return (
    <div className="flex flex-col basis-full justify-evenly bg-black bg-opacity-25 dark:bg-opacity-15 rounded px-2 [&>:not(:last-child)]:border-b">
      {Object.entries(tags).map(([key, value], index) => (
        <div
          key={index}
          className="text-white text-sm flex justify-between p-2 border-dashed border-white border-opacity-50"
        >
          <div className="font-medium">{Titles[key] || key}:&nbsp;</div>
          <div
            className={`flex items-center ${value ?? `text-white text-opacity-50`} ${key == "radical" && value ? "font-japaneseRadicals" : ""}`}
          >
            {value || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
}

KanjiTags.propTypes = {
  tags: PropTypes.shape({
    jlpt: PropTypes.string,
    grade: PropTypes.string,
  }),
};

export default KanjiTags;
