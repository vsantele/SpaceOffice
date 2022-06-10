import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'



export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: mode === 'production' ? '/front/' : '/',
    server: {
      proxy: {
        '/api': {
          target: env.BACK_API,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
  },
  }
})

