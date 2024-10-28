function About() {
  const Sources = {
    kanjivg: {
      title: "KanjiVg",
      link: "https://kanjivg.tagaini.net/",
      text: "Provides SVGs for Kanji characters. Released under the Creative Commons Attribution-Share Alike 3.0 licence.",
    },
    jlpt: {
      title: "JLPT Levels",
      link: "https://www.tanos.co.uk/jlpt/",
      text: "Information on JLPT levels from Tanos.",
    },
    data: {
      title: "Kanji-Alive",
      link: "https://github.com/kanjialive/kanji-data-media",
      text: "Kanji data such as meanings, readings and other things. Licensed under Creative Commons Attribution 4.0.",
    },
    composition: {
      title: "The-Kanji-Map",
      link: "https://github.com/gabor-kovacs/the-kanji-map",
      text: "Kanji Composition Data from The-Kanji-Map.",
    },
  };

  return (
    <div className="max-w-3xl min-h-outlet-dvh flex flex-col gap-16 mx-auto p-10 text-xl">
      <section className="flex flex-col gap-3">
        <h2 className="text-white text-3xl font-bold">About</h2>
        <p className="text-white opacity-85 pl-1.5">
          Kandiction is a quick-reference resource for Kanji characters,
          offering information on meanings, readings, stroke order, and JLPT
          levels.
        </p>
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-white text-3xl font-bold">Credits</h2>
        <p className="text-white opacity-85 pl-1.5">
          The data used in Kandiction comes from various open-source projects:
        </p>
        <ul className="flex flex-col gap-3 my-3 pl-1.5">
          {Object.values(Sources).map((source, index) => (
            <li className="group" key={index}>
              <strong className="flex items-center text-white underline can-hover:opacity-85 can-hover:hover:opacity-100">
                <a href={source.link} target="_blank">
                  {source.title}
                </a>
                <img className="mx-1 size-5" src="/external-link.svg" alt="" />
              </strong>
              <p className="text-white text-opacity-85">{source.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default About;
