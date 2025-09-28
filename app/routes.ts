import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing/landing-page.tsx"),
  route("*", "routes/redirect.tsx"),
] satisfies RouteConfig;
