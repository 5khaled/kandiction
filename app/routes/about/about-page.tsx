import type { Route } from "./+types/about-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function About() {
  return <main>About Page</main>;
}
