import { capitalize } from "../../utils/string/capitalize";
import { type KanaMap, type KanaType } from "../../types/kanaTypes";

import HiraganaLetter from "./KanaLetter";

// prettier-ignore
const kana: { hiragana: KanaMap; katakana: KanaMap } = {
  hiragana: {
    あ: { reading: "a",   index: 1 }, い: { reading: "i",   index: 2 }, う: { reading: "u",   index: 3 }, え: { reading: "e",   index: 4 }, お: { reading: "o",   index: 5 },
    か: { reading: "ka",  index: 1 }, き: { reading: "ki",  index: 2 }, く: { reading: "ku",  index: 3 }, け: { reading: "ke",  index: 4 }, こ: { reading: "ko",  index: 5 },
    さ: { reading: "sa",  index: 1 }, し: { reading: "shi", index: 2 }, す: { reading: "su",  index: 3 }, せ: { reading: "se",  index: 4 }, そ: { reading: "so",  index: 5 },
    た: { reading: "ta",  index: 1 }, ち: { reading: "chi", index: 2 }, つ: { reading: "tsu", index: 3 }, て: { reading: "te",  index: 4 }, と: { reading: "to",  index: 5 },
    な: { reading: "na",  index: 1 }, に: { reading: "ni",  index: 2 }, ぬ: { reading: "nu",  index: 3 }, ね: { reading: "ne",  index: 4 }, の: { reading: "no",  index: 5 },
    は: { reading: "ha",  index: 1 }, ひ: { reading: "hi",  index: 2 }, ふ: { reading: "fu",  index: 3 }, へ: { reading: "he",  index: 4 }, ほ: { reading: "ho",  index: 5 },
    ま: { reading: "ma",  index: 1 }, み: { reading: "mi",  index: 2 }, む: { reading: "mu",  index: 3 }, め: { reading: "me",  index: 4 }, も: { reading: "mo",  index: 5 },
    や: { reading: "ya",  index: 1 },                                   ゆ: { reading: "yu",  index: 3 },                                   よ: { reading: "yo",  index: 5 },
    ら: { reading: "ra",  index: 1 }, り: { reading: "ri",  index: 2 }, る: { reading: "ru",  index: 3 }, れ: { reading: "re",  index: 4 }, ろ: { reading: "ro",  index: 5 },
    わ: { reading: "wa",  index: 1 },                                                                                                       を: { reading: "wo",  index: 5 },
    ん: { reading: "n",   index: 1 },
  },
  katakana: {
    ア: { reading: "a",   index: 1 }, イ: { reading: "i",   index: 2 }, ウ: { reading: "u",   index: 3 }, エ: { reading: "e",   index: 4 }, オ: { reading: "o",   index: 5 },
    カ: { reading: "ka",  index: 1 }, キ: { reading: "ki",  index: 2 }, ク: { reading: "ku",  index: 3 }, ケ: { reading: "ke",  index: 4 }, コ: { reading: "ko",  index: 5 },
    サ: { reading: "sa",  index: 1 }, シ: { reading: "shi", index: 2 }, ス: { reading: "su",  index: 3 }, セ: { reading: "se",  index: 4 }, ソ: { reading: "so",  index: 5 },
    タ: { reading: "ta",  index: 1 }, チ: { reading: "chi", index: 2 }, ツ: { reading: "tsu", index: 3 }, テ: { reading: "te",  index: 4 }, ト: { reading: "to",  index: 5 },
    ナ: { reading: "na",  index: 1 }, ニ: { reading: "ni",  index: 2 }, ヌ: { reading: "nu",  index: 3 }, ネ: { reading: "ne",  index: 4 }, ノ: { reading: "no",  index: 5 },
    ハ: { reading: "ha",  index: 1 }, ヒ: { reading: "hi",  index: 2 }, フ: { reading: "fu",  index: 3 }, ヘ: { reading: "he",  index: 4 }, ホ: { reading: "ho",  index: 5 },
    マ: { reading: "ma",  index: 1 }, ミ: { reading: "mi",  index: 2 }, ム: { reading: "mu",  index: 3 }, メ: { reading: "me",  index: 4 }, モ: { reading: "mo",  index: 5 },
    ヤ: { reading: "ya",  index: 1 },                                   ユ: { reading: "yu",  index: 3 },                                   ヨ: { reading: "yo",  index: 5 },
    ラ: { reading: "ra",  index: 1 }, リ: { reading: "ri",  index: 2 }, ル: { reading: "ru",  index: 3 }, レ: { reading: "re",  index: 4 }, ロ: { reading: "ro",  index: 5 },
    ワ: { reading: "wa",  index: 1 },                                                                                                       ヲ: { reading: "wo",  index: 5 },
    ン: { reading: "n",   index: 1 },
  }
  };

export default function KanaSection({ kanaType }: { kanaType: KanaType }) {
  return (
    <div className="flex flex-col border border-transparent">
      <h1
        className="text-[10cqi] font-bold text-white py-2
                    md:text-5xl md:py-4"
      >
        {capitalize(kanaType)}
      </h1>
      <section
        className="self-center grid gap-[2cqi] p-[2.5cqi]
                          md:gap-2 md:p-2
                          "
      >
        {Object.entries(kana[kanaType]).map(([letter, entry]) => (
          <HiraganaLetter key={letter} letter={letter} entry={entry} />
        ))}
      </section>
    </div>
  );
}
