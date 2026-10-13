# personal

My portfolio / hire-me website. Plain HTML, CSS and JavaScript: no build step, hosted free on GitHub Pages.

## Editing the content

Almost everything lives in **`content.js`**: name, bio, skills, projects (with in-depth details on data storage, tools and APIs), labs, and contact info. Edit the text between the quotes and commit; the site updates in about a minute.

- **Photo:** add your picture as `assets/photo.jpg` (square works best) and set `photo: "assets/photo.jpg"` in `content.js`.
- **Résumé:** add `assets/resume.pdf` and set `resume: "assets/resume.pdf"` to show a download button.
- **New project or lab:** copy one `{ ... }` block in the list, paste it after the last one, and edit it.

To preview locally, just open `index.html` in a browser.

## Publishing on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. The site appears at `https://arogers8.github.io/personal/` within a minute or two.

## Using your custom domain

1. Put your domain (for example `yourname.com`) as the only line in a file named `CNAME` at the root of this repo. (Or type it in **Settings → Pages → Custom domain**, which creates the file for you.)
2. At the company you bought the domain from, open its DNS settings and add:

   | Type  | Host / Name | Value |
   |-------|-------------|-------|
   | A     | `@`         | `185.199.108.153` |
   | A     | `@`         | `185.199.109.153` |
   | A     | `@`         | `185.199.110.153` |
   | A     | `@`         | `185.199.111.153` |
   | CNAME | `www`       | `arogers8.github.io` |

   Remove any existing "parking" A records or URL forwarding for `@` and `www` first.
3. DNS can take up to a day to spread. Once **Settings → Pages** shows the domain check passing, tick **Enforce HTTPS**.
