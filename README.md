# Portfolio Website - Althaf Aprima Ksatria

A modern, responsive, single-page personal portfolio website built with vanilla HTML, CSS, and JavaScript. No build step, no dependencies, no backend.

## File Structure

```
index.html   - Main HTML with all sections and SEO metadata
style.css    - All styling (CSS variables, Flexbox/Grid, dark mode, responsive)
script.js    - Theme toggle, navigation, scroll reveal, project modal, project data
robots.txt   - SEO crawler directives
sitemap.xml  - Single-page sitemap
CV_Althaf_Aprima_Ksatria.pdf  - Downloadable CV
```

## Running Locally

Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node (if npx is available)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`.

## Deployment

### GitHub Pages
1. Push these files to a GitHub repository
2. Go to Settings > Pages
3. Set source to the main branch root
4. The site will be live at `https://<username>.github.io/<repo>/`

### Netlify
1. Drag and drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop)

### Vercel
1. Run `npx vercel` in this directory

## Editing Content

### Profile and About
Edit the text directly in `index.html` inside the `#about` and `#hero` sections.

### Experience
Edit the timeline in `index.html` inside the `#experience` section.

### Education and Certifications
Edit the cards in `index.html` inside the `#education` section.

### Skills
Edit the skill groups and chips in `index.html` inside the `#skills` section.

### Contact
Edit email, LinkedIn, and CV links in `index.html` inside the `#contact` section and the Hero buttons.

### Project Data
Edit the `projects` array at the top of `script.js`. Each project has:
- `id`, `title`, `organization`, `tools` (array), `isBSI` (boolean), `gradient` (CSS), `cardLabel`
- `caseStudy` with `context`, `problem`, `myRole`, `tools`, `process` (array of 3-5 strings), `outcome`, `gallery` (array of `{caption, blurred}` objects)
- Set any field to `null` to display a visible "TODO:" placeholder

## Adding Project Images

1. Place image files in the same directory (or an `images/` subfolder)
2. Replace the CSS gradient placeholder divs in `renderProjectCards()` and `renderGallery()` in `script.js` with `<img>` tags:
   ```html
   <img src="images/project1-home.png" alt="Description of the image" />
   ```
3. For BSI projects, keep the `blurred: true` flag and the "Data shown is illustrative / anonymized" note

## Replacing the CV

1. Replace `CV_Althaf_Aprima_Ksatria.pdf` in this directory with the updated PDF
2. The file must have a single `.pdf` extension
3. The download links in `index.html` reference `CV_Althaf_Aprima_Ksatria.pdf`

## Theme

- The site follows the system color scheme preference by default
- A manual toggle (sun/moon icon in the header) switches between light and dark
- The choice is kept in memory only and resets on page reload (no localStorage)

## SEO

- Edit `<title>` and `<meta name="description">` in `index.html`
- Update Open Graph and Twitter card tags in `<head>`
- Update the JSON-LD Person schema `<script>` block
- Update `sitemap.xml` and `robots.txt` with your domain

## Remaining TODOs

Search for "TODO:" in the files to find all placeholders. Here is the complete list:

| Location | Field | Description |
|----------|-------|-------------|
| script.js - Project 1 (Culture Division Website) | My Role | My specific role and responsibilities |
| script.js - Project 1 (Culture Division Website) | Process | Process steps (3-5) |
| script.js - Project 2 (Regional Data Visualization) | My Role | My specific role and responsibilities |
| script.js - Project 2 (Regional Data Visualization) | Process | Process steps (3-5) |
| script.js - Project 3 (Berbagi Mobile App UI Design) | Problem | Problem description |
| script.js - Project 3 (Berbagi Mobile App UI Design) | My Role | My role and team |
| script.js - Project 3 (Berbagi Mobile App UI Design) | Process | Process steps (3-5) |
| script.js - Project 3 (Berbagi Mobile App UI Design) | Outcome | Outcome and results |
| script.js - Project 4 (Recommendation System Research) | Problem | Problem description |
| script.js - Project 4 (Recommendation System Research) | My Role | My role |
| script.js - Project 4 (Recommendation System Research) | Tools | Tools used |
| script.js - Project 4 (Recommendation System Research) | Process | Method, respondents |
| script.js - Project 4 (Recommendation System Research) | Outcome | Findings |
| script.js - Project 4 (Recommendation System Research) | Gallery | Gallery images |
| index.html - Certifications | TOEFL Date | Date not specified |
| All projects | Gallery images | All gallery images are CSS placeholders |
