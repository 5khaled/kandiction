import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import KanjiSvg from "./KanjiSvg/KanjiSvg.tsx";
import Primitives from "./Primitives.tsx";
import KanjiMeanings from "./Meanings.tsx";
import Tags from "./Tags";
import Readings from "./Readings.tsx";
// import Examples from "./Examples.tsx";

const KanjiCard = () => {
  const { id } = useParams();

  type kanjiDataType = {
    kanji: string | undefined;
    jlpt: string | undefined;
    kgrade: string | undefined;
    kstroke: number | undefined;
    radical: string | undefined;
    kmeaning: string | undefined;
    onyomi_ja: string | undefined;
    kunyomi_ja: string | undefined;
    in: string[];
    out: string[];
    examples: string | undefined;
  };

  const [kanjiData, setKanjiData] = useState<kanjiDataType>();
  const KANJI: string | undefined = id ? id[0] : undefined;

  useEffect(() => {
    async function handleFetch() {
      try {
        const response = await fetch(`https://kanji.vwh.sh/kanji/${KANJI}`);

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setKanjiData({ ...data });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    handleFetch();
  }, [KANJI]);

  return (
    <>
      <div className="flex flex-col items-center p-7">
        <main className="min-[52.625rem]:min-w-[50.125rem] max-[52.625rem]:w-full relative p-5 gap-3 grid grid-cols-[0fr_1fr] grid-rows-[repeat(3,auto)] items-start rounded border border-white border-opacity-35 backdrop-blur-md">
          <section className="col-start-1 row-start-1 row-span-2 max-xs:row-start-2 max-xs:col-span-2 max-xs:row-span-1 flex flex-col max-xs:flex-row max-2xs:flex-col max-2xs:items-stretch gap-3">
            <KanjiSvg KANJI={KANJI} />
            <Tags
              tags={{
                jlpt: kanjiData?.jlpt,
                grade: kanjiData?.kgrade,
                strokes: kanjiData?.kstroke,
                radical: kanjiData?.radical,
              }}
            />
          </section>
          <section className="max-xs:col-start-1 max-xs:row-start-1 max-xs:col-span-2">
            <KanjiMeanings Meanings={kanjiData?.kmeaning} />
          </section>
          <section className="col-start-1 row-start-3 max-xs:col-span-2 flex flex-col gap-3">
            <Readings readings={kanjiData?.onyomi_ja} type="on" />
            <Readings readings={kanjiData?.kunyomi_ja} type="kun" />
          </section>
          <section className="col-start-2 row-span-2 max-xs:col-start-1 max-xs:col-span-2 flex flex-col items-start">
            <main className="flex flex-col gap-3 max-sm:self-stretch">
              <div className="flex flex-wrap gap-5">
                <Primitives
                  primitives={kanjiData?.in}
                  kanji={KANJI}
                  type="out"
                />
                <Primitives
                  primitives={kanjiData?.out}
                  kanji={KANJI}
                  type="in"
                />
              </div>
              {/* <Examples examples={kanjiData?.examples} /> */}
            </main>
          </section>
        </main>
      </div>
    </>
  );
};
export default KanjiCard;
