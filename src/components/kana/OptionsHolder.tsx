import KanaOption from "./KanaOption";

export default function OptionsHolder() {
  return (
    <>
      <div
        className="flex gap-[2cqi]
                md:flex-col md:gap-3"
      >
        <KanaOption kanaType="hiragana" />
        <KanaOption kanaType="katakana" />
      </div>
      <hr className="mx-6 mt-3 opacity-35 md:hidden" />
    </>
  );
}
