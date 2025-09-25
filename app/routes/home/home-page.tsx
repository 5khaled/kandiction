import type { Route } from "./+types/home-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function Home() {
  return <main>Home Page</main>;
}
