import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import NutUIResolver from '@nutui/auto-import-resolver'
import ElementPlus from 'unplugin-element-plus/vite'
import UnoCSS from 'unocss/vite'
import path from "path";
// https://vitejs.dev/config/
export default (model) => {
    let env = loadEnv(model.mode, process.cwd())
    return defineConfig({
        plugins: [vue(), vueJsx(), UnoCSS(),
            Components({
                resolvers: [NutUIResolver()],
            }),ElementPlus()],
        server: {
            host: true,
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_APP_API,
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        },

        resolve: {
            alias: {
                // '@': fileURLToPath(new URL('./src', import.meta.url))
                "@": path.resolve(__dirname, "src")
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        }
    })
}
