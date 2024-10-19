import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="relative min-h-dvh flex flex-col bg-gradient-to-br from-emerald-600 via-cyan-600 to-teal-600">
      <Header />
      <main className="min-h-outlet-dvh flex flex-col z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
