import { type HiraganaLetter } from "../../types/kanaTypes";

export default function HiraganaLetter({ letter, entry }: HiraganaLetter) {
  return (
    <div
      style={{ gridColumnStart: entry.index }}
      // style={{ gridRowStart: entry.index }}
      className={`[container-type:inline-size] max-md:size-[16cqi] md:size-16 lg:size-[4.5rem] xl:size-20 transition-colors bg-black bg-opacity-25 text-white rounded-lg flex items-center justify-center border border-transparent cursor-pointer can-hover:hover:border-white`}
    >
      <ruby className="text-[42cqi] leading-none">
        {letter}
        <rt className="font-light">{entry.reading}</rt>
      </ruby>
    </div>
  );
}
