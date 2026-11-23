import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // la 3D est chargée à part, seulement quand elle est nécessaire
    chunkSizeWarningLimit: 1000,
  },
})
