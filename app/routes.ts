import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "routes/main/main-layout.tsx", [
    index("routes/home/home-page.tsx"),
    route("/about", "routes/about/about-page.tsx"),
    route("/kanji", "routes/kanji/kanji-page.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
