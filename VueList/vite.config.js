import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    server: {
        // proxy: {
        //     "/db": {
        //         target: "http://localhost:3000/api",
        //         changeOrigin: true,
        //         secure: false,
        //         rewrite: (path) => path.replace(/^\/db/, ""),
        //     },
        //     "/ext": {
        //         target: "http://localhost:3000/ext",
        //         changeOrigin: true,
        //         secure: false,
        //         rewrite: (path) => path.replace(/^\/ext/, ""),
        //     },
        // },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
