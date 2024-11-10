import { useState, useEffect } from "react";

export default function ThemeSwitch() {
  // Disabled detecting system theme so the default is always Light
  const systemTheme = "light";
  // // Detect System Theme
  // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ? "dark"
  //   : "light";

  // Apply Theme on load
  useEffect(() => {
    if (localStorage.theme) {
      document.documentElement.classList.add(localStorage.theme);
    } else {
      localStorage.theme = systemTheme;
      document.documentElement.classList.add(systemTheme);
    }
  });

  const [theme, setTheme] = useState(
    localStorage.theme ? localStorage.theme : systemTheme,
  );

  function changeTheme() {
    // From Dark to Light
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    }
    // From Light to Dark
    else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    }
  }

  return (
    <button
      onClick={changeTheme}
      className="group/dropdown flex items-center gap-2"
    >
      <div
        title={`Switch to ${theme === "light" ? "Dark" : "Light"} theme`}
        className="opacity-75 can-hover:group-hover/dropdown:opacity-100 active:scale-95 transition-all bg-white bg-opacity-25 rounded-full p-0.5 border border-white border-opacity-35"
      >
        <img
          src={theme === "light" ? "/light_theme.svg" : "/dark_theme.svg"}
          className="pointer-events-none select-none max-w-none size-5 p-0.5 rounded-full"
        />
      </div>
      <span className="text-white hidden max-xl:block leading-none opacity-65 can-hover:group-hover/dropdown:opacity-85 transition-opacity">
        Appearance
      </span>
    </button>
  );
}
