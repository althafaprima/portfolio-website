# Tech

- Stack: Vite + React + TypeScript + Tailwind CSS. Static site only: no backend, no database, no API keys, no secrets, no analytics scripts.

- All site text lives in typed files under src/data/ (profile, experience, projects, education, certifications, skills) so content can be edited without touching components.

- Accessibility: WCAG 2.1 AA, semantic HTML landmarks, keyboard navigation, visible focus states, descriptive alt text, respects prefers-reduced-motion.

- Performance: Lighthouse 90+ for Performance, Accessibility, Best Practices, and SEO. Compressed, lazy-loaded images. Minimal dependencies.

- Do not use localStorage or sessionStorage.

- Deployable to GitHub Pages, Netlify, or Vercel with one build command.
