import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same build target either the custom domain (default '/')
// or a GitHub Pages project site served from /dna_studio/.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  appType: 'mpa',
  build: {
    rolldownOptions: {
      input: ['index.html', 'bystep.html'],
    },
  },
})
