import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        theme_color: "#8936FF",
        background_color: "#6B7A99",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "images/icons/icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "images/icons/icon512_rounded.png",
            type: "image/png",
          },
        ],
        orientation: "portrait",
        display: "fullscreen",
        name: "Quranium",
        short_name: "Quranium",
        shortcuts: [
          {
            name: "Home",
            short_name: "Home",
            url: "/",
            icons: [
              {
                src: "images/icons/icon-72x72.png",
                sizes: "72x72",
                type: "image/png",
              },
            ],
          },
          {
            name: "Post 1",
            short_name: "Post 1",
            url: "/post/1",
            icons: [
              {
                src: "images/icons/icon-72x72.png",
                sizes: "72x72",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
});
