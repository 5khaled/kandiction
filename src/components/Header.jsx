import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-transparent w-full flex items-center gap-5 p-2 backdrop-blur shadow-sm">
      <Link className="flex items-center m-2 gap-2" to="/">
        <img className="size-7" src="/kandiction_logo_white.svg" alt="" />
        <h1 className="text-white text-xl font-bold">Kandiction</h1>
      </Link>
      <nav
        className={`grow flex [&>*]:px-3 divide-white divide-opacity-75 divide-x justify-end`}
      >
        <a
          className="opacity-75 can-hover:hover:opacity-100 transition-opacity"
          title="Give us a star on Github! <3"
          target="_blank"
          href="https://github.com/5Khaled/Kandiction"
        >
          <img className="size-6 max-w-none" src="/github_icon.svg" alt="" />
        </a>
        <Link
          title="About page"
          className="opacity-75 can-hover:hover:opacity-100 transition-opacity"
          to="/about"
        >
          <img className="size-6 max-w-none" src="/info_icon.svg" alt="" />
        </Link>
      </nav>
    </header>
  );
}
export default Header;
