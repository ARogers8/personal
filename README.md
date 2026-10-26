# personal

My portfolio / hire-me website. Plain HTML, CSS and JavaScript: no build step, hosted free on GitHub Pages.

## Editing the content

Almost everything lives in **`content.js`**: name, bio, skills, projects (with in-depth details on data storage, tools and APIs), labs, and contact info. Edit the text between the quotes and commit; the site updates in about a minute.

- **Photo:** add your picture as `assets/photo.jpg` (square works best) and set `photo: "assets/photo.jpg"` in `content.js`.
- **Résumé:** add `assets/resume.pdf` and set `resume: "assets/resume.pdf"` to show a download button.
- **New project or lab:** copy one `{ ... }` block in the list, paste it after the last one, and edit it.

To preview locally, just open `index.html` in a browser.

## Publishing on Vercel (www.andrewrogers.app)

The site is plain HTML, CSS and JavaScript, so Vercel serves it as-is with no build step. Every push to `main` updates the live site, and every pull request gets its own preview link.

1. Go to https://vercel.com/new and import the `personal` repo.
2. Leave **Framework Preset** as **Other**, and leave the build command and output directory empty. Click **Deploy**.
3. In the new project, open **Settings → Domains** and add `www.andrewrogers.app`. When Vercel asks, also add `andrewrogers.app` and choose to redirect it to `www.andrewrogers.app`.
4. If `andrewrogers.app` is registered or managed in Vercel, the DNS is set up for you. If it's managed somewhere else, add the records Vercel shows on the Domains page at that provider.
5. Vercel issues the HTTPS certificate on its own. `.app` domains only work over HTTPS, so wait until the domain shows **Valid Configuration** before testing it.
