import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],

  server: {
        port: 5173, // порт фронта (опционально)
        proxy: {
            // Прокси для всех запросов на /api
            '/api': {
                target: 'http://localhost:3000', // адрес бэкенда
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '') // если нужно переписать путь
            },
            // Прокси для статических файлов (если есть)
            '/uploads': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
            // WebSocket прокси (если используете socket.io)
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
})
