import Search from "./components/Search";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Index() {
  return (
    <div className="min-h-outlet-dvh flex flex-col justify-center gap-7 ~/sm:~mx-6/10">
      <h1 className="~/sm:~text-2xl/4xl ~/sm:~leading-9/[3.5rem] max-w-xl self-center text-center font-extrabold text-white drop-shadow-lg">
        Type a Kanji to see its details and readings.
      </h1>
      <Search />
      <RandomKanji />
    </div>
  );
}

export default Index;

function RandomKanji() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://kanji.vwh.sh/random");
      if (response.ok) {
        const kanji = await response.text();
        setLoading(false);
        navigate(`/kanji/${kanji}`);
      }
    } catch (err) {
      console.error("Failed to load a Random Kanji");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          loading
            ? "opacity-30 scale-90 cursor-not-allowed [&>img]:animate-spin"
            : "opacity-40 can-hover:hover:opacity-70 active:scale-95 transition-all"
        } relative select-none self-center size-14 p-1.5 flex items-center justify-center rounded-xl border border-white bg-transparent backdrop-blur-lg`}
        disabled={loading}
      >
        <img className="size-full pointer-events-none" src="/dice.svg" />
      </button>
    </>
  );
}
