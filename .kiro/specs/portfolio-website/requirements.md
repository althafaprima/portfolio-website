# Requirements Document

## Introduction

This document specifies a modern, responsive, single-page personal portfolio website for Althaf Aprima Ksatria, a Business Analyst / Information Systems Management professional based in Jakarta, Indonesia. The site is a static application built with Vite, React, TypeScript, and Tailwind CSS, with all content stored in typed data files so it can be edited without touching components.

The audience is recruiters and hiring managers for Business Analyst, Data, and Product roles, with collaborators and lecturers as a secondary audience. The goal is that within 30 seconds a visitor knows who the Owner is, what he has done (with proof), and how to contact him or download his CV. All copy is written in the first person, is professional and clear, and never exaggerates. No facts, numbers, metrics, testimonials, clients, or links are ever invented; unknown information appears as a visible TODO_Placeholder.

## Glossary

- **Site**: The portfolio website, a static single-page application built with Vite, React, TypeScript, and Tailwind CSS.
- **Owner**: Althaf Aprima Ksatria, the subject of the portfolio.
- **Visitor**: Any person viewing the Site, including recruiters, hiring managers, collaborators, and lecturers.
- **Content_Data**: Typed TypeScript files under `src/data/` that store all site text so content can be edited without touching components.
- **Hero**: The top section of the Site showing the Owner's name, title, value sentence, action buttons, and an optional profile photo.
- **At_a_Glance**: The verified-facts strip rendered directly below the Hero.
- **About**: The section rendering the Owner's professional profile text and quick facts.
- **Experience_Timeline**: The section rendering the Owner's work history in chronological order.
- **Project_Card**: An image-first card in the Projects section representing one project, with a consistent aspect ratio and tool tags.
- **Project_Detail**: A modal or sub-section that opens when a Project_Card is activated, showing the full case study.
- **Case_Study_Template**: The required fields for every Project_Detail: Context, Problem, My Role, Tools, Process, Outcome, and Gallery.
- **Theme_Toggle**: The manual control that switches the Site between light and dark themes.
- **Reduced_Motion**: The state where the Visitor's system reports the `prefers-reduced-motion: reduce` media query.
- **TODO_Placeholder**: A visible marker beginning with `TODO:` used in place of unknown information so that gaps are easy to find by searching for `TODO:`.
- **CV_File**: The Owner's CV PDF served at the path `/CV_Althaf_Aprima_Ksatria.pdf`.
- **Verified_Facts**: The set of facts explicitly provided in the spec brief CONTENT that may appear on the Site; any fact outside this set is unknown and becomes a TODO_Placeholder.
- **Section_Anchor**: A navigable in-page target for a section of the Site, used by the sticky header.

## Requirements

### Requirement 1: Hero and Positioning

**User Story:** As a recruiter, I want to see the Owner's name, title, and value proposition immediately, so that I can decide within 30 seconds whether to keep reading.

#### Acceptance Criteria

1. WHEN the Site loads, THE Hero SHALL display the Owner's name "Althaf Aprima Ksatria", the title "Business Analyst | Information Systems Management", and one value sentence written in the first person, all visible within the initial viewport without scrolling, where the value sentence does not exceed 150 characters.
2. THE Hero SHALL render three buttons, all visible within the initial viewport without scrolling: a "Download CV" button linking to the CV_File, a "View Projects" button that scrolls to the Projects section, and a "LinkedIn" button linking to the Owner's LinkedIn profile.
3. IF no profile photo is provided, THEN THE Hero SHALL render a placeholder slot containing the Owner's initials and no image in place of the photo.
4. THE Hero value sentence SHALL reference only skills or capabilities that are evidenced by at least one Project or Experience_Timeline entry on the Site.
5. THE Hero SHALL render all text in the first person with correct spelling, grammar, and consistent capitalization.
6. IF the CV_File or the Owner's LinkedIn profile URL is not available, THEN THE Hero SHALL render the corresponding button with a visible placeholder indicating the link is not yet available instead of a broken link.

### Requirement 2: About and At-a-Glance Proof

**User Story:** As a hiring manager, I want verified proof points near the top of the page, so that I can assess the Owner's credentials without scrolling far.

#### Acceptance Criteria

1. WHEN the page renders, THE At_a_Glance SHALL appear as the section immediately following the Hero with no other section rendered between them.
2. THE At_a_Glance SHALL display the following Verified_Facts: Master's GPA 3.95 with Summa Cum Laude designation, approximately 18,000 employees normalized, four portfolio projects, and the tools Google Data Studio, Figma, and Google Workspace.
3. THE At_a_Glance SHALL render no metric, figure, or fact that is not part of the Verified_Facts.
4. THE About SHALL render the Owner's professional background and career summary written in the first person.
5. THE About SHALL display the quick facts "Jakarta, Indonesia" and "Master's Summa Cum Laude".

### Requirement 3: Experience Timeline

**User Story:** As a hiring manager, I want a chronological work history, so that I can evaluate the Owner's professional experience and contributions.

#### Acceptance Criteria

1. THE Experience_Timeline SHALL render each role with employer, job title, location, and date range sourced from Content_Data, ordered by role start date with the most recent role first.
2. THE Experience_Timeline SHALL render each role's accomplishments as bullet points sourced from Content_Data.
3. IF a key contribution is provided for a role, THEN THE Experience_Timeline SHALL render that contribution in a separate container positioned outside the role's accomplishment bullet point list, applying at least one visual styling treatment (such as a distinct background or border) that is not applied to the bullet points.

### Requirement 4: Project Case Studies

**User Story:** As a recruiter, I want detailed project case studies, so that I can understand the Owner's actual contribution and impact.

#### Acceptance Criteria

1. THE Projects section SHALL render exactly four Project_Cards, each image-first with a consistent 16:9 aspect ratio and tool tags sourced from Content_Data.
2. WHEN a Visitor selects a Project_Card via click, tap, or keyboard activation, THE Site SHALL open a Project_Detail containing every Case_Study_Template field: Context, Problem, My Role, Tools, Process, Outcome, and Gallery, where Process contains 3 to 5 steps.
3. IF a Case_Study_Template field has no known value, THEN THE Project_Detail SHALL render a TODO_Placeholder in place of that field rather than inventing content.
4. THE Project_Detail Gallery SHALL render a caption for each image that references the specific content or purpose visible in that image, and SHALL reject any caption that could apply to an unrelated image.
5. IF a project uses internal BSI employee data, THEN THE Project_Detail SHALL render dashboard images blurred or replaced with sample data, SHALL display the note "Data shown is illustrative / anonymized", and SHALL render no real employee names and no real internal figures beyond the Verified_Facts.

### Requirement 5: Education, Certifications, and Skills

**User Story:** As a recruiter, I want academic credentials, certifications, and skills in one place, so that I can verify qualifications quickly.

#### Acceptance Criteria

1. THE Education section SHALL render each education entry with institution, location, date range, and degree name, all sourced from Content_Data.
2. IF a GPA value is available for an education entry, THEN THE Education section SHALL render that GPA alongside the entry.
3. THE Certifications section SHALL render each certification or course with title, issuer, and date sourced from Content_Data, where the date may be a single date or a date range.
4. THE Skills section SHALL render skills as grouped chips across the groups Business and Data Analysis, Design and System Modeling, Tools, Soft Skills, and Languages, all sourced from Content_Data.

### Requirement 6: Contact and CV Download

**User Story:** As a recruiter, I want clear contact options and a CV download, so that I can reach out or save the Owner's details.

#### Acceptance Criteria

1. WHEN the Visitor selects the email button, THE Contact section SHALL open the user's default email application with the Owner's email address as the recipient.
2. WHEN the Visitor selects the LinkedIn button, THE Site SHALL open the Owner's LinkedIn profile in a new browser tab.
3. WHEN the Visitor selects the "Download CV" button, THE Site SHALL download the CV_File to the user's device.
4. THE Site SHALL render no contact form and no phone number.
5. THE Footer SHALL render copyright text only, where the copyright text includes a copyright indicator (© or "Copyright"), a year, and the Owner's name.

### Requirement 7: Quality: Design, Responsive, Accessibility, Performance, SEO, and Documentation

**User Story:** As a Visitor on any device, I want a fast, accessible, professional site, so that I can read the content comfortably and find it via search.

#### Acceptance Criteria

1. THE Site SHALL render a sticky header with a Section_Anchor for each section, an active-section indicator, a mobile menu that collapses below 768px viewport width, and a Back-to-top control that appears after the Visitor scrolls at least 400px.
2. THE Site SHALL render with one accent color, a single H1, a defined type scale with consistent H2 and H3 headings and no skipped heading levels, a line length between 60 and 80 characters, and a minimum of 24px of whitespace between sections, using the Inter typeface.
3. THE Site SHALL provide light and dark themes that follow the system preference by default and a Theme_Toggle that persists only in memory for the session and does not persist across page reloads.
4. WHILE the Reduced_Motion state is active, THE Site SHALL disable all scroll-reveal animations and non-essential transitions.
5. THE Site SHALL render all sections with no horizontal scrolling and no content overlap at viewport widths of 360px, 768px, and 1280px.
6. THE Site SHALL meet WCAG 2.1 AA for color contrast, keyboard navigation, semantic HTML landmarks, visible focus states, and where every img element has a non-empty alt attribute describing its purpose.
7. THE Site SHALL achieve a Lighthouse score of 90 or higher in each of Performance, Accessibility, Best Practices, and SEO when audited at a 360px mobile viewport.
8. THE Site SHALL include SEO metadata comprising a title not exceeding 60 characters, a meta description between 120 and 160 characters, Open Graph tags, Twitter tags, a favicon, a `sitemap.xml`, a `robots.txt`, and a JSON-LD Person schema.
9. THE Site SHALL store all user-visible strings in typed Content_Data files so that content can be edited without touching components.
10. THE Site SHALL include a README documenting how to edit content, add project images, replace the CV_File, run locally, build, deploy, and a section enumerating each TODO_Placeholder with its location in the codebase.
11. WHEN `npm run build` runs, THE Site SHALL build successfully with zero TypeScript errors and produce no console errors during initial page load and in-page navigation.
12. THE Site SHALL serve all images in compressed formats and SHALL lazy-load images below the fold.
