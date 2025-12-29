import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = '/challenge-basic-frontend-1/tugas-5/'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    base: base,
  }
})
