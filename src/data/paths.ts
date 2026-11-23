// BASE_URL is '/' on the custom domain and '/dna_studio/' on the GitHub Pages project site,
// so internal links and public assets resolve correctly under either base.
export const base = import.meta.env.BASE_URL
export const planToPath = `${base}plan-to/`

export const asset = (path: string) => `${base}${path.replace(/^\//, '')}`
