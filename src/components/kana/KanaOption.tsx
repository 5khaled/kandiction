import { capitalize } from "../../utils/string/capitalize";

import { type KanaType } from "../../types/kanaTypes";

import { useKanaOption } from "../../stores/kanaOptionStore";

export default function KanaOption({
  kanaType,
  disabled
}: {
  kanaType: KanaType;
  disabled?: boolean;
}) {
  const { selectedOption, setSelectedOption } = useKanaOption();

  return (
    <button
      disabled={disabled}
      onClick={() => setSelectedOption(kanaType)}
      className={`${!disabled && (kanaType === selectedOption ? "bg-black bg-opacity-25" : "bg-black bg-opacity-15 border-transparent can-hover:hover:bg-white can-hover:hover:bg-opacity-15 can-hover:hover:border-white can-hover:hover:border-opacity-50")}
                ${disabled ? "disabled:bg-white disabled:bg-opacity-10 disabled:text-black disabled:text-opacity-15 disabled:border-transparent disabled:border-dotted disabled:cursor-not-allowed" : ""}
              text-white border rounded-xl grow aspect-square flex justify-center items-center cursor-pointer transition-colors
                md:grow-0 md:aspect-auto md:py-12 md:px-16
                `}
    >
      <h1
        className={`text-[7cqi]
                  md:text-4xl`}
      >
        {capitalize(kanaType)}
      </h1>
    </button>
  );
}
