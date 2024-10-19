import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-transparent w-full flex items-center gap-5 p-2 backdrop-blur shadow-sm">
      <Link className="flex items-center m-2 gap-2" to="/">
        <img className="size-7" src="/kandiction_logo_white.svg" alt="" />
        <h1 className="text-white text-xl font-bold">Kandiction</h1>
      </Link>
      <nav
        className={`grow flex [&>*]:px-3 divide-white divide-opacity-50 divide-x justify-end`}
      >
        <Github />
        <About />
      </nav>
    </header>
  );
}
export default Header;

function About() {
  const location = useLocation();
  const isActive = location.pathname === "/about";
  return (
    <Link
      className={`flex items-center gap-2 ${isActive ? "opacity-100" : "opacity-75 can-hover:hover:opacity-100 transition-opacity"}`}
      title="About page"
      to="/about"
    >
      <img
        className={`size-6 max-w-none xs:hidden rounded-full ${isActive ? "outline" : ""} outline-white outline-1 outline-offset-2`}
        src="/info_icon.svg"
        alt=""
      />
      <span
        className={`text-white max-xs:hidden leading-none ${isActive ? "underline" : ""}`}
      >
        About
      </span>
    </Link>
  );
}

function Github() {
  return (
    <a
      className="flex items-center gap-2 opacity-75 can-hover:hover:opacity-100 transition-opacity"
      title="Give us a star on Github! <3"
      target="_blank"
      href="https://github.com/5Khaled/Kandiction"
    >
      <img
        className={`size-5 max-xs:size-6 max-w-none`}
        src="/github_icon.svg"
        alt=""
      />
      <span className="text-white max-xs:hidden leading-none">GitHub</span>
    </a>
  );
}
