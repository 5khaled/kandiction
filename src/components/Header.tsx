import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ThemeSwitch from "./buttons/ThemeSwitch";
import { useEffect } from "react";

type HeaderProps = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ navOpen, setNavOpen }: HeaderProps) {
  useEffect(() => {
    const handleResize = () => {
      setNavOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setNavOpen]);

  return (
    <header className="sticky top-0 z-20 bg-transparent w-full flex gap-2 p-2 backdrop-blur shadow-sm dark:shadow-[#ffffff0d]">
      <Link
        onClick={() => {
          setNavOpen(false);
        }}
        className="flex items-center m-2 gap-2"
        to="/"
      >
        <img
          className="size-7 pointer-events-none select-none"
          src="/kandiction_logo_white.svg"
        />
        <h1 className="text-white text-xl font-bold">Kandiction</h1>
      </Link>
      <nav className="grow flex justify-end">
        <button
          onClick={
            navOpen
              ? () => {
                  setNavOpen(false);
                }
              : () => {
                  setNavOpen(true);
                }
          }
          className="group transition-all hidden max-md:flex flex-col gap-1 max-xl:p-3 items-end justify-center opacity-75 can-hover:group-hover:opacity-100"
        >
          <div
            className={`h-0.5  ${
              navOpen
                ? "rotate-45 absolute w-5"
                : "w-5 can-hover:group-hover:w-4"
            } transition-all bg-white`}
          />
          <div
            className={`h-0.5  ${
              navOpen
                ? "-rotate-45 absolute w-5"
                : "w-3 can-hover:group-hover:w-5"
            } transition-all bg-white`}
          ></div>
          <div
            className={`h-0.5  ${
              navOpen
                ? " -rotate-45 absolute w-5"
                : "w-4 can-hover:group-hover:w-3"
            } transition-all bg-white`}
          ></div>
        </button>
        <div
          className={`
          grow flex ${navOpen ? "max-md:flex" : "max-md:hidden"}
          scale max-md:~px-16/32 max-md:flex-col max-md:py-8 max-md:bg-teal-700 max-md:dark:bg-cyan-950 max-md:bg-opacity-80 max-md:dark:bg-opacity-90 max-md:backdrop-blur-sm max-md:absolute max-md:min-h-outlet-dvh max-md:w-dvw max-md:top-[60px] max-md:left-0`}
        >
          <div
            className="
            grow flex gap-3 md:px-3
            max-md:grow-0 max-md:flex-col
            max-md:[&>:not(.separator)]:text-xl
            max-md:[&>*]:border-b max-md:[&>*]:py-3
          "
          >
            <Section
              title="Hiragana & Katakana"
              path="/kana"
              // imgSrc="/info_icon.svg"
              text="Kana"
              setNavOpen={setNavOpen}
            />
            <Section
              title="About page"
              path="/about"
              // imgSrc="/info_icon.svg"
              text="About"
              setNavOpen={setNavOpen}
            />
          </div>
          {/* <Separator extra="max-xl:hidden" /> */}
          <section
            className="group relative flex xl:px-3 max-md:py-10
          "
          >
            <button className="flex gap-1 max-xl:p-3 items-center justify-center xl:hidden max-md:hidden opacity-75 can-hover:group-hover:opacity-100">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </button>
            <div
              className="flex flex-row-reverse max-xl:hidden max-xl:group-hover:flex max-xl:flex-col xl:gap-3
          max-xl:absolute max-xl:top-full max-xl:right-1 max-xl:rounded-md
          max-xl:border border-white border-opacity-50 max-xl:bg-black max-xl:bg-opacity-35 max-xl:dark:bg-opacity-50
          max-md:basis-full max-md:bg-transparent
          max-md:relative max-md:flex max-md:top-auto max-md:right-auto max-md:border-none
          "
            >
              <div
                className="flex max-xl:px-4 max-xl:py-3 max-md:rounded-md max-md:bg-black max-md:bg-opacity-15
              max-md:[&>:first-child]:flex-row-reverse max-md:[&>:first-child]:basis-full max-md:[&>:first-child]:justify-between"
              >
                <ThemeSwitch />
              </div>
              <Separator extra="xl:hidden max-md:hidden" type="horizontal" />
              <Separator extra="max-xl:hidden" />
              <div
                className="
                flex justify-start items-center gap-3 max-xl:p-3
                max-md:justify-center max-md:gap-6 max-md:py-6 max-xl:[&_img]:size-5 max-md:[&_img]:size-8
                "
              >
                <Social
                  title="GitHub"
                  link="https://github.com/5Khaled/Kandiction"
                  imgSrc="/github_icon.svg"
                />
                <Social
                  title="Twitter"
                  link="https://x.com/5kh4led"
                  imgSrc="/twitter_icon.svg"
                />
              </div>
            </div>
          </section>
        </div>
      </nav>
    </header>
  );
}
export default Header;

type SeparatorProps = {
  type?: string;
  extra: string;
};

function Separator({ type, extra = "" }: SeparatorProps) {
  let separatorType = type ? type : "vertical";
  switch (separatorType) {
    case "horizontal":
      separatorType = "w-full h-px relative top-1/2 -translate-y-1/2";
      break;
    case "vertical":
      separatorType = "w-px h-1/2 relative top-1/2 -translate-y-1/2";
      break;
  }
  const separatorStyle = `${separatorType} ${extra}`;
  return (
    <span className={`separator ${separatorStyle} bg-white bg-opacity-50`} />
  );
}

type SectionProps = {
  title: string;
  path: string;
  text: string;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Section({ title, path, text, setNavOpen }: SectionProps) {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link
      onClick={() => {
        setNavOpen(false);
      }}
      className={`group flex items-center gap-2 transition-all ${
        isActive
          ? "opacity-100"
          : "opacity-75 can-hover:hover:opacity-100 transition-opacity"
      }`}
      title={title}
      to={path}
    >
      <span
        className={`text-white leading-none transition-transform ${
          isActive ? "md:underline" : ""
        } max-md:can-hover:group-hover:translate-x-1`}
      >
        {text}
      </span>
    </Link>
  );
}

type SocialProps = {
  title: string;
  link: string;
  imgSrc: string;
};

function Social({ title, link, imgSrc }: SocialProps) {
  return (
    <a
      className="flex items-center gap-2 opacity-65 can-hover:hover:opacity-85 transition-opacity"
      title={title}
      target="_blank"
      href={link}
    >
      <img
        className={`pointer-events-none select-none size-6 max-w-none`}
        src={imgSrc}
      />
    </a>
  );
}
