import type { Route } from "./+types/landing-page";
import { cn } from "~/lib/utils";

import KandictionIcon from "~/components/icons/kandiction_logo";

import { Mail, Twitter } from "lucide-react";

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
      <header className="fixed top-0 w-full flex flex-row-reverse"></header>
      <main className="container mx-auto flex flex-col ">
        <section
          className={cn(
            `min-h-screen flex flex-col items-center justify-evenly px-8`,
            "min-h-svh",
          )}
        >
          <header className="flex flex-col items-center py-16 sm:py-8">
            <div className="flex items-center gap-3">
              <KandictionIcon className="fill-sky-500 size-10 sm:size-16" />
              <h1 className="mt-1 leading-[0.75] text-4xl sm:text-6xl font-bold">
                Kandiction
              </h1>
            </div>
          </header>
          <div className="flex flex-col items-center space-y-4">
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
              <span className="absolute w-full h-5/12 bottom-0 bg-linear-to-t from-10% sm:from-15% from-background to-transparent"></span>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-4 px-8 my-16 sm:my-8">
          <h1 className="text-xl md:text-2xl font-medium">
            What is Kandiction?
          </h1>
          <p className="text-center text-pretty text-secondary-foreground max-w-[75ch]">
            Kandiction is a kanji reference I’m building to make looking up
            characters simple and actually useful. You can check meanings,
            readings, stroke order, and see how each kanji is built from its
            parts. I’m also working on features like profiles, personal
            libraries, and a small community section to share and discuss kanji.
            Still early — more will come as it grows.
          </p>
        </section>

        <footer className="w-full flex flex-col items-center gap-8 px-8 my-16 sm:my-8">
          <section className="flex flex-col gap-4">
            <h1 className="self-center text-xl md:text-2xl font-medium">
              Reach out
            </h1>
            <div className="flex justify-center flex-wrap gap-4">
              <a
                href="https://x.com/5kh4led"
                target="_blank"
                title="I'm not active on X, but a follow is appreciated."
                className="group flex items-center gap-1 text-secondary-foreground hover:text-foreground transition-all"
              >
                <Twitter className="fill-current size-4" />
                <span className="text-sm group-hover:underline">@5kh4led</span>
              </a>
              <a
                href="mailto:khaled2shboul@gmail.com"
                target="_blank"
                title="I'm not active on X, but a follow is appreciated."
                className="group flex items-center gap-1 text-secondary-foreground hover:text-foreground transition-all"
              >
                <Mail className="size-4" />
                <span className="text-sm group-hover:underline">
                  khaled2shboul@gmail.com
                </span>
              </a>
            </div>
          </section>
          <div className="text-secondary-foreground font-light">
            Made by{" "}
            <a
              href="https://kald.dev"
              target="_blank"
              className="pointer-coarse:underline pointer-fine:hover:underline"
            >
              KALD
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
