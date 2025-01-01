import KanaSection from "../components/kana/KanaSection";
import OptionsHolder from "../components/kana/OptionsHolder";
import SvgPlayer from "../components/svg-player/SvgPlayer";

import { useKanaOption } from "../stores/kanaOptionStore";

export default function KanaPage() {
  const { selectedOption } = useKanaOption();
  return (
    <div className="flex flex-col">
      <main
        className="relative [container-type:inline-size] flex flex-col justify-center
                  md:flex-row "
      >
        <section
          className="flex flex-col m-[3.5cqi]
        xl:flex-row md:gap-6 md:m-6"
        >
          <div
            className="flex flex-col gap-6
          xl:self-start xl:sticky xl:top-[84px]"
          >
            <OptionsHolder />
          </div>
          <KanaSection kanaType={selectedOption} />
        </section>
        <section
          className=" min-h-outlet-dvh self-start flex items-center justify-center grow sticky top-[60px]
                    max-md:hidden md:mr-6 md:pt-6 max-xl:items-start"
        >
          <SvgPlayer style="compact" canvasSize={"flexible"} />
        </section>
      </main>
    </div>
  );
}
