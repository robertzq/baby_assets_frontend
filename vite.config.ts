import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mkcert()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.71.83:8080', // 后端服务地址
        changeOrigin: true, // 必须设置为true
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // 配置开发服务器监听所有网络接口
    host: '0.0.0.0',
    // 如果需要，可以在此设置端口
    port: 443
  }
})
