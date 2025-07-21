import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
