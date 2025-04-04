import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'nscc-0491179-ticketapi-f8cya2h8hxcsbea5.canadacentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
