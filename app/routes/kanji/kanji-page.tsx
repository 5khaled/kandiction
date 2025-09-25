import type { Route } from "./+types/kanji-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kanji | Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function kanji() {
  return <main>Kanji Page</main>;
}
