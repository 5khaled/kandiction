import Search from "./components/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Index() {
  return (
    <div className="min-h-outlet-dvh flex flex-col justify-center">
      <h1 className="text-[clamp(1.25rem,0.609rem+4.1026vw,2.25rem)] max-w-xl mb-10 mx-7 self-center text-center font-extrabold text-white drop-shadow-lg">
        Type a Kanji to see its details and readings.
      </h1>
      <section className="flex flex-col items-center gap-5">
        <Search />
        <RandomKanji />
      </section>
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
          loading ? "opacity-50 scale-95" : "opacity-100"
        } group rounded-lg border border-white border-opacity-40 bg-transparent backdrop-blur-lg transition-colors transition-scale can-hover:hover:border-opacity-70`}
        disabled={loading}
      >
        <img
          className="size-10 opacity-40 p-1.5 transition-opacity can-hover:group-hover:opacity-70"
          src="/dice.svg"
          alt=""
        />
      </button>
    </>
  );
}
