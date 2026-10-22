# Implementation Plan: Portfolio Website

## Overview

A static single-page portfolio website built with Vite + React + TypeScript + Tailwind CSS for Althaf Aprima Ksatria (Business Analyst | Information Systems Management). All user-visible text lives in typed data files under `src/data/` so content can be edited without touching components. The architecture separates three concerns: a content layer (typed data), a presentation layer (stateless React sections/components), and a behavior layer (small hooks for theme, active-section tracking, reduced motion, scroll reveal, and modal state). No backend, no router, no `localStorage`/`sessionStorage`, no analytics. Unknown information renders as visible `TODO:` placeholders rather than invented facts.

Implementation proceeds bottom-up: scaffold the project, build the typed data layer and hooks, then shared primitives and layout components, then each content section, then the project detail modal, then wire everything together in `App`, then add SEO/performance assets, responsive and accessibility verification, the README, and a final build check. Testing is layered as optional sub-tasks (unit tests with Vitest + React Testing Library + jest-axe, integration tests, Playwright responsive checks, and Lighthouse CI) sitting alongside the code they verify.

## Tasks

- [ ] 1. Scaffold project, install dependencies, and configure build
  - [ ] 1.1 Initialize a Vite + React + TypeScript project and install dependencies: Tailwind CSS, `@fontsource-variable/inter`, and testing libraries (`vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-axe`, `@playwright/test`)
    - Scaffold into the workspace root; create `package.json` scripts for `dev`, `build` (`tsc && vite build`), `preview`, `test`, and `lint`
    - _Requirements: 7.11_
  - [ ] 1.2 Configure Tailwind CSS (content paths, `darkMode: 'class'` class-strategy dark mode, Inter as the default font family, a single accent color with WCAG-AA-compliant contrast in both themes, a defined type scale) and the Vite config (portable `base: './'` for GitHub Pages, any needed build optimizations)
    - _Requirements: 7.2, 7.3_
  - [ ] 1.3 Configure the testing stack: Vitest + jsdom environment, `@testing-library/jest-dom` setup file, jest-axe, Playwright config (360/768/1280 viewport projects), and Lighthouse CI config targeting a 360px mobile viewport
    - _Requirements: 7.6, 7.7_
  - [ ] 1.4 Create the directory structure (`src/components`, `src/sections`, `src/data`, `src/assets`, `public/`) and rename the CV file on disk from `CV_Althaf_Aprima_Ksatria.pdf.pdf` to `CV_Althaf_Aprima_Ksatria.pdf` under `public/` so it is served at `/CV_Althaf_Aprima_Ksatria.pdf`
    - _Requirements: 6.3_

- [ ] 2. Build the typed data layer
  - [ ] 2.1 Define all core types in `src/data/types.ts`: `Maybe<T>` discriminated union, `DateValue`, `Links`, `Profile`, `VerifiedFacts`, `ExperienceItem`, `GalleryImage`, `CaseStudy`, `Project`, `EducationItem`, `Certification`, `SkillGroup`/`SkillGroupName`, `NavItem`, `SeoMeta`
    - `Maybe<T>` is either `{ known: true; value: T }` or `{ known: false; todo: string }` so every gap is discoverable by searching for `TODO:`
    - _Requirements: 1.1, 1.3, 1.4, 1.6, 2.2, 3.1, 3.3, 4.1, 4.2, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 7.8, 7.9_
  - [ ] 2.2 Create the content data files, each exporting typed constants containing verified facts only with `TODO:` placeholders for any unknown value: `profile.ts`, `atAGlance.ts`, `experience.ts` (pre-sorted by role start date descending), `projects.ts` (exactly 4 projects), `education.ts`, `certifications.ts`, `skills.ts` (5 named groups), `nav.ts`, `seo.ts`
    - Use first-person copy; set `profile.links.cvPath` to `/CV_Althaf_Aprima_Ksatria.pdf`; mark BSI projects with `isBSI: true`; include a build-time assertion that `projects` has exactly 4 entries
    - _Requirements: 1.1, 1.3, 1.5, 1.6, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 4.1, 4.5, 5.1, 5.4, 7.9_

- [ ] 3. Implement behavior hooks
  - [ ] 3.1 Implement `useTheme` in `src/hooks/useTheme.ts`: seed initial state from `window.matchMedia('(prefers-color-scheme: dark)').matches`, expose `{ theme, toggle }`, add/remove the `dark` class on `document.documentElement` via an effect, use in-memory React state only (no `localStorage`/`sessionStorage`)
    - _Requirements: 7.3_
  - [ ] 3.2 Implement `useActiveSection` (`IntersectionObserver` returning the id of the most-visible section), `useReducedMotion` (boolean from `matchMedia('(prefers-reduced-motion: reduce)')`), and `useScrollReveal` (adds a reveal class on scroll, a no-op when reduced motion is active)
    - _Requirements: 7.1, 7.4_
  - [ ] 3.3 Implement `useModal` context (`ModalProvider` holding the open project id, `openProject(id)` and `closeProject()` exposed via `useModal()`) to drive `ProjectDetailDialog`
    - _Requirements: 4.2_

- [ ] 4. Build shared primitives and layout components
  - [ ] 4.1 Implement `Placeholder` component: renders the `todo` text (beginning with `TODO:`) for any `Maybe<T>` value whose `known` is false, so unknown fields display a visible marker instead of invented content
    - _Requirements: 1.6, 4.3_
  - [ ] 4.2 Implement `Header` (sticky `position: sticky; top: 0`) with a `<nav>` of anchor links from `nav.ts`, an active-section indicator driven by `useActiveSection`, and a mobile hamburger menu that collapses below 768px viewport width using `aria-expanded` disclosure semantics
    - _Requirements: 7.1_
  - [ ] 4.3 Implement `ThemeToggle` (single `<button aria-label>` with `aria-pressed` reflecting dark state, calls `useTheme().toggle()`) and `BackToTop` (`<button>` revealed when `scrollY >= 400`, accessible label, smooth scroll unless reduced motion)
    - _Requirements: 7.1, 7.3, 7.4_
  - [ ] 4.4 Implement `Footer` rendering copyright text only: a copyright indicator (©), the current year, and the Owner's name
    - _Requirements: 6.5_
  - [ ]* 4.5 Write unit and accessibility tests for layout components (Header active indicator via mocked `IntersectionObserver`, mobile menu collapse, ThemeToggle `aria-pressed`, BackToTop visibility after 400px, Footer copyright format; run `jest-axe` on rendered output)
    - _Requirements: 6.5, 7.1, 7.3_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Build Hero, At-a-Glance, and About sections
  - [ ] 6.1 Implement `Hero` rendering the Owner's name as the single `H1`, the title, one first-person value sentence (≤ 150 chars), and three buttons ("Download CV" `<a href={cvPath} download>`, "View Projects" `<a href="#projects">`, "LinkedIn" `<a target="_blank" rel="noopener noreferrer">`); render an initials slot (no `<img>`) when no photo; render a disabled placeholder control with a TODO label when `cvPath`/LinkedIn is unknown instead of a broken link
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [ ] 6.2 Implement `AtAGlance` as the section immediately following the Hero in document order (no section between them) rendering exactly the `VerifiedFacts` and no other metric/figure, and `About` rendering first-person professional background plus the quick facts "Jakarta, Indonesia" and "Master's Summa Cum Laude"
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [ ]* 6.3 Write unit tests for Hero, AtAGlance, and About (name/title/value sentence present in one viewport, value sentence ≤ 150 chars, three buttons render, initials placeholder when no photo, placeholder control for unknown links, At-a-Glance immediate document order, exactly VerifiedFacts rendered, About first-person text and quick facts)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 7. Build Experience Timeline section
  - [ ] 7.1 Implement `ExperienceTimeline` mapping `experience.ts` (already sorted by start date descending), with each `ExperienceItem` showing employer, job title, location, date range, accomplishments as a `<ul>` of bullets; render `keyContribution` in a separate visually distinct container (accent-tinted background/border) positioned outside the bullet list
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ]* 7.2 Write unit tests for ExperienceTimeline (roles ordered by start date descending, accomplishments render as bullets, `keyContribution` renders in a separate element with a distinct class not applied to bullets, unknown contribution renders a Placeholder)
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 8. Build Projects section and ProjectCard
  - [ ] 8.1 Implement `Projects` rendering exactly 4 `ProjectCard`s and `ProjectCard` as image-first with `aspect-ratio: 16 / 9`, tool tags as chips, and activation on click, tap, and keyboard (`Enter`/`Space` on a wrapped `<button>`) calling `useModal().openProject(id)`
    - _Requirements: 4.1, 4.2_
  - [ ]* 8.2 Write unit tests for Projects and ProjectCard (exactly 4 cards, 16:9 aspect ratio, tool tags render, opening via click and keyboard triggers the modal)
    - _Requirements: 4.1, 4.2_

- [ ] 9. Build ProjectDetailDialog
  - [ ] 9.1 Implement `ProjectDetailDialog` using the native `<dialog>` element opened via `.showModal()`: render all seven `Case_Study_Template` fields (Context, Problem, My Role, Tools, Process, Outcome, Gallery) with `Process` as a 3–5 step ordered list, render a `Placeholder` for any unknown field, render gallery images each with a specific caption, and for `isBSI` projects render dashboard images blurred with the note "Data shown is illustrative / anonymized" and no real employee names or internal figures beyond `VerifiedFacts`; include focus management (focus trap, ESC to close, focus restoration to the trigger, `inert` on background content) and `role="dialog"`/`aria-modal`/`aria-labelledby`
    - _Requirements: 4.2, 4.3, 4.4, 4.5_
  - [ ]* 9.2 Write accessibility and unit tests for ProjectDetailDialog (dialog opens with all seven fields, Process has 3–5 steps, unknown fields render Placeholder, BSI blurring and anonymization note present with no real names/figures, focus trap and restoration, `jest-axe` on the open dialog)
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Build Education, Certifications, Skills, and Contact sections
  - [ ] 11.1 Implement `Education` (each entry: institution, location, date range, degree; GPA rendered only when known), `Certifications` (each: title, issuer, date as single date or range), and `Skills` (five named groups rendered as chips: Business and Data Analysis, Design and System Modeling, Tools, Soft Skills, Languages)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ] 11.2 Implement `Contact` with an email button (`mailto:`), a LinkedIn button (new tab, `rel="noopener noreferrer"`), and a "Download CV" button (download); render no contact form and no phone number anywhere
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [ ]* 11.3 Write unit tests for Education, Certifications, Skills, and Contact (required fields render, GPA only when known, certification date single-or-range, five named skill groups as chips, `mailto:` recipient, LinkedIn `target="_blank"` + `rel="noopener noreferrer"`, CV download, no `<form>` and no phone number anywhere)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4_

- [ ] 12. Assemble App and wire all components
  - [ ] 12.1 Wire `App` to render `Header`, the `main` landmark containing all sections in document order (Hero, AtAGlance, About, ExperienceTimeline, Projects, Education, Certifications, Skills, Contact), `Footer`, `BackToTop`, `ThemeToggle`, and a `ModalProvider` with the lazy-loaded `ProjectDetailDialog` (`React.lazy`); each `<section>` gets a stable `id` and `aria-labelledby` pointing to its heading; smooth-scroll navigation suppresses to `auto` under reduced motion
    - _Requirements: 1.1, 2.1, 7.1, 7.2, 7.4_
  - [ ]* 12.2 Write integration tests for `App` (exactly one `H1`, no skipped heading levels, At-a-Glance immediately follows Hero, section order is correct, no `localStorage`/`sessionStorage` usage in source/bundle, no `<form>` and no phone number, theme toggle adds/removes `dark` class, reduced motion disables scroll-reveal)
    - _Requirements: 1.1, 2.1, 2.5, 3.1, 7.2, 7.3, 7.4, 7.9_

- [ ] 13. Add SEO metadata and performance assets
  - [ ] 13.1 Configure `index.html` with `<html lang="en">`, a `<title>` ≤ 60 chars, a `<meta name="description">` between 120 and 160 chars, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`), Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`), `<link rel="icon">` favicon, and a JSON-LD `<script type="application/ld+json">` Person schema (name, jobTitle, addressLocality, email, sameAs→LinkedIn, knowsAbout) sourced from `seo.ts`
    - _Requirements: 7.8_
  - [ ] 13.2 Add `public/robots.txt` (allow all, point to sitemap) and `public/sitemap.xml` (single canonical URL); ensure images are served compressed, below-the-fold images use native `loading="lazy"` + `decoding="async"`, the Hero image is eager-loaded with `fetchpriority="high"`, and every `<img>` carries a non-empty `alt` (decorative images use `alt=""`)
    - _Requirements: 7.6, 7.8, 7.12_

- [ ] 14. Verify responsive layouts, accessibility, and performance
  - [ ] 14.1 Write Playwright tests asserting no horizontal scrolling and no content overlap at 360px, 768px, and 1280px; assert the mobile menu collapses below 768px and Back-to-top appears after 400px scroll; assert no console errors on initial load and in-page navigation
    - _Requirements: 7.1, 7.5, 7.11_
  - [ ] 14.2 Configure and run Lighthouse CI asserting Performance, Accessibility, Best Practices, and SEO scores each ≥ 90 at a 360px mobile viewport
    - _Requirements: 7.7_

- [ ] 15. Write README
  - [ ] 15.1 Write `README.md` documenting how to edit content via `src/data/*`, how to add project images under `src/assets/` (and `public/` for CV/favicon/social), how to replace the CV file (single-extension naming rule), local dev/build/preview commands, deployment to GitHub Pages/Netlify/Vercel, and a table enumerating every remaining `TODO:` placeholder with its file location
    - _Requirements: 7.10_

- [ ] 16. Final checkpoint - Build verification and zero errors
  - [ ] 16.1 Run `npm run build` (`tsc` type-check + `vite build`) to confirm zero TypeScript errors and a successful static `dist/` output; verify no console errors during initial page load and in-page navigation
    - _Requirements: 7.11_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Unit tests validate specific examples and edge cases; integration tests validate cross-component wiring
- Property-based testing is intentionally omitted — the design document determines it is not applicable to this static UI-rendering feature
- The design uses TypeScript throughout (React + TypeScript), so no language selection step was required
- All copy must be first person; never invent facts — unknowns render as visible `TODO:` placeholders
- The CV file on disk is named `CV_Althaf_Aprima_Ksatria.pdf.pdf` (double extension) but must be served at `/CV_Althaf_Aprima_Ksatria.pdf`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "2.1"] },
    { "id": 2, "tasks": ["2.2", "3.1", "3.2", "3.3", "4.1", "4.4", "13.2"] },
    { "id": 3, "tasks": ["4.2", "4.3", "6.1", "6.2", "7.1", "8.1", "11.1", "11.2", "13.1"] },
    { "id": 4, "tasks": ["9.1", "4.5", "6.3", "7.2", "8.2", "11.3"] },
    { "id": 5, "tasks": ["9.2", "12.1"] },
    { "id": 6, "tasks": ["12.2", "14.1", "15.1"] },
    { "id": 7, "tasks": ["14.2", "16.1"] }
  ]
}
```
