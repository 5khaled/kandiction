import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div
      className="min-h-dvh flex flex-col bg-gradient-to-br 
    from-emerald-600 via-cyan-600 to-cyan-600 selection:bg-cyan-100 selection:text-cyan-700 
    dark:from-cyan-950 dark:via-sky-950 dark:to-cyan-950 dark:selection:bg-cyan-700 dark:selection:text-cyan-100"
    >
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main
        className={`min-h-outlet-dvh ${
          navOpen ? "hidden" : "flex"
        } flex-col z-10`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
