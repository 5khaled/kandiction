import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Index from "./pages/Index.tsx";
import Card from "./components/card/Card.tsx";
import NotFound from "./pages/NotFound.tsx";
import About from "./pages/About.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="/kanji/:id" element={<Card />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
