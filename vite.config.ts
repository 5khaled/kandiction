import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    reactRouter(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
  },
});
