import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  server: {
    proxy: {
      "/api": "http://localhost:1234",
    },
  },
});
