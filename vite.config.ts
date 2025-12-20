import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      react(),
      isDev && componentTagger(),
    ].filter(Boolean),

    // ✅ Local ke liye base "/"
    base: isDev ? "/" : process.env.VITE_BASE_PATH || "/",

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    server: {
      port: 8080,
    },
  };
});