type TagsProps = {
  jlpt: string | undefined;
  grade: string | undefined;
  strokes: number | undefined;
  radical: string | undefined;
};

function KanjiTags({ tags }: { tags: TagsProps }) {
  const Titles: Record<keyof TagsProps, string> = {
    jlpt: "JLPT",
    grade: "Grade",
    strokes: "Strokes",
    radical: "Radical"
  };

  return (
    <div className="flex flex-col basis-full justify-evenly bg-black bg-opacity-25 dark:bg-opacity-15 rounded px-2 [&>:not(:last-child)]:border-b">
      {Object.entries(tags).map(([key, value], index) => {
        const typedKey = key as keyof TagsProps; // Explicitly tell TypeScript this is a valid key of TagsProps
        return (
          <div
            key={index}
            className="text-white text-sm flex justify-between p-2 border-dashed border-white border-opacity-50"
          >
            <div className="font-medium">{Titles[typedKey] || key}:&nbsp;</div>
            <div
              className={`flex items-center ${
                value ?? `text-white text-opacity-50`
              } ${
                typedKey === "radical" && value ? "font-japaneseRadicals" : ""
              }`}
            >
              {value || "N/A"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanjiTags;
