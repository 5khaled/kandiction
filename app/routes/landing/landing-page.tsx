import type { Route } from "./+types/landing-page";
import { cn } from "~/lib/utils";

import KandictionIcon from "~/components/icons/kandiction_logo";

import { Twitter } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Soon! | Kandiction" },
    {
      name: "description",
      content: `Kandiction is a quick-reference resource for Kanji characters.`,
    },
  ];
}

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 w-full flex flex-row-reverse">
        <a
          href="https://x.com/5kh4led"
          target="_blank"
          title="I'm not active on X, but a follow is appreciated."
          className="group p-3"
        >
          <Twitter className="text-secondary-foreground group-hover:text-foreground fill-current size-5" />
        </a>
      </header>
      <main
        className={cn(
          `container h-screen flex flex-col items-center sm:justify-center mx-auto max-sm:mt-24 px-8 space-y-8`,
          "h-svh",
        )}
      >
        <header className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <KandictionIcon className="fill-sky-500 size-10 sm:size-16" />
            <h1 className="mt-1 leading-[0.75] text-4xl sm:text-6xl font-bold">
              Kandiction
            </h1>
          </div>
        </header>
        <section className="flex flex-col items-center space-y-4">
          <p className="text-xl md:text-2xl font-light text-secondary-foreground">
            Currently in Development!
          </p>
          <div className="relative">
            <img
              className="hidden sm:block w-full max-w-[1090px]"
              src="images/kandiction-kanji_page_(dark).png"
              alt=""
            />
            <img
              className="sm:hidden w-full max-w-[300px]"
              src="images/kandiction-home_page-dark_mobile.png"
              alt=""
            />
            <span className="absolute w-full h-5/12 bottom-0 bg-linear-to-t from-25% from-background to-transparent"></span>
          </div>
        </section>
      </main>
      <section
        className={cn(
          `container flex flex-col items-center space-y-8 mx-auto px-8 mb-32`,
        )}
      >
        <h1 className="text-2xl md:text-4xl font-medium">
          What is Kandiction?
        </h1>
        <p className="text-center text-pretty text-secondary-foreground max-w-[75ch]">
          Kandiction is a kanji reference I’m building to make looking up
          characters simple and actually useful. You can check meanings,
          readings, stroke order, and see how each kanji is built from its
          parts. I’m also working on features like profiles, personal libraries,
          and a small community section to share and discuss kanji. Still early
          — more will come as it grows.
        </p>
      </section>
      <footer className="p-4 w-full flex justify-center">
        <div className="text-secondary-foreground font-light">
          Made by{" "}
          <a
            href="https://kald.dev"
            target="_blank"
            className="hover:underline"
          >
            KALD
          </a>
        </div>
      </footer>
    </>
  );
}
