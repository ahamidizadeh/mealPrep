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
  define: {
    "process.env": {}, // If you need to access process.env in your code
    global: {}, // Define global as an empty object or equate it to window based on your needs
  },
});
