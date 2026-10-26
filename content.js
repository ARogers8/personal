/*
 * ============================================================
 *  EDIT THIS FILE to change what your website says.
 *  Everything on the site (bio, projects, labs, contact) comes
 *  from here. You don't need to touch index.html or styles.css.
 *
 *  Tips:
 *  - Keep the quotes and commas. Text goes between the quotes.
 *  - To add a project or lab, copy one { ... } block, paste it
 *    after the last one (with a comma between), and edit it.
 *  - Leave a link as "" to hide that button.
 *  - Each project's "sections" become the click-to-open boxes.
 *    Add, remove or rename them freely.
 * ============================================================
 */

window.SITE = {
  name: "Your Name",
  role: "IT student building apps with AI, 3D graphics and encryption",
  // Put your photo in the "assets" folder and update the file name here.
  photo: "assets/photo.svg",
  resume: "", // e.g. "assets/resume.pdf" — leave "" to hide the button
  available: "Open to internships and entry-level IT roles",

  about: {
    paragraphs: [
      "I'm an Information Technology student at [Your University], graduating [Month Year]. I build complete products end to end: a fitness tracker with an AI food logger, a 3D virtual try-on app, an encrypted messaging tool and a daily movie game.",
      "I'm looking for an internship or entry-level role in [IT support / networking / cloud / software development]. I learn fast, document what I build, and like shipping things people actually use.",
    ],
    facts: [
      { label: "School", value: "[Your University]" },
      { label: "Major", value: "Information Technology" },
      { label: "Graduating", value: "[Month Year]" },
      { label: "Location", value: "[City, State]" },
    ],
    skills: [
      "JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js",
      "SQL / PostgreSQL", "Prisma", "three.js", "REST APIs", "Claude API",
      "Git & GitHub Actions", "Vercel", "Linux",
    ],
    certifications: [
      // e.g. "CompTIA A+ (2025)"
    ],
  },

  projects: [
    {
      name: "ALLIN1",
      kind: "Full-stack web app",
      color: "#c6f432",
      summary:
        "An all-in-one fitness tracker that turns food, workouts, steps and daily weigh-ins into one number: how much to eat today to cut, maintain or bulk. Type what you ate or snap a photo, and the AI estimates the nutrition and asks follow-up questions when the answer would change the calories.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Claude API"],
      links: {
        live: "https://www.allin1app.dev",
        code: "https://github.com/ARogers8/ALLIN1",
      },
      sections: [
        {
          title: "Technical description",
          items: [
            "Built with Next.js 15 (App Router and server actions), TypeScript and Tailwind CSS 4.",
            "The calorie engine adds up BMR (Mifflin-St Jeor), daily movement, steps and each workout's MET value, then calibrates itself against your real weight trend once there are enough days logged (capped at ±25%). It is covered by unit tests in Vitest.",
            "Food analysis sends the text or photo to the Claude API and gets back structured nutrition checked against a Zod schema, plus clarifying questions like \"6-inch or footlong?\".",
            "Accounts use email and password with bcrypt hashing and a signed session token (jose) stored in a cookie. New sign-ups confirm a 6-digit code sent by email.",
            "GitHub Actions runs lint, type checks, tests and a production build on every pull request. Vercel deploys every push to main.",
          ],
        },
        {
          title: "Data storage",
          items: [
            "PostgreSQL (hosted on Neon), accessed through the Prisma ORM.",
            "Tables for users, food entries, saved foods, weigh-ins, steps, workouts and sets, exercises and email codes. Every row is tied to its user, so each account's data stays separate.",
            "Anything you've logged before is saved as a remembered food, so typing it again is instant and skips the AI call.",
            "Schema changes are versioned Prisma migrations that run automatically on deploy.",
          ],
        },
        {
          title: "Tools & APIs",
          items: [
            "Claude API: reads food descriptions and photos and estimates nutrition",
            "Resend: sends sign-up verification emails",
            "Neon Postgres, Prisma, Vercel",
            "Recharts for the weight trend and progress charts",
            "Vitest, ESLint, Docker Compose (local database), GitHub Actions",
          ],
        },
      ],
    },
    {
      name: "Fitcheck",
      kind: "3D web app",
      color: "#a78bfa",
      summary:
        "Try on clothes from any store on your own 3D model. Paste a link to a single piece (Zara pants, PacSun sneakers), pick your size, and see the whole outfit head to toe. It estimates how each size will fit you, and every piece is saved with a link back to buy it.",
      tags: ["React", "three.js", "Node.js", "Express", "Computer vision"],
      links: {
        live: "",
        code: "https://github.com/ARogers8/fitcheck",
      },
      sections: [
        {
          title: "Technical description",
          items: [
            "Front end in React with three.js (react-three-fiber and drei), built with Vite. Back end is an Express server on Node.js.",
            "When you paste a link, the server reads the product page in layers: JSON-LD, Shopify's product JSON, OpenGraph tags, then the visible size picker and photo gallery. That gives the name, brand, price, every size and every photo.",
            "The title decides the garment type. The server cuts the piece out of its photo with sharp, removing the model's skin and the backdrop. With an API key, Claude's vision draws a box around the exact piece instead.",
            "The 3D body is built from open-source MakeHuman assets. A Python script compresses them into a small binary mesh, which the app reshapes for your sex, height and weight and smooths with one Catmull-Clark pass.",
            "Each garment is a 3D layer around the body (base, mid, outer, bottoms, shoes, hat), and the product photo is warped onto it row by row so prints and logos land in the right place.",
            "When a store blocks automated reads, a bookmarklet reads the page in your own browser and sends the piece to Fitcheck.",
          ],
        },
        {
          title: "Data storage",
          items: [
            "No database. Saved pieces, sizes and your avatar settings are kept in the browser's localStorage.",
            "The body model ships as a compact binary file plus a JSON index (about 3.3 MB, 1.8 MB gzipped) that the app loads on start.",
            "Product photos stay on the store's servers. The app keeps the links, not copies.",
          ],
        },
        {
          title: "Tools & APIs",
          items: [
            "Claude API (vision): finds the exact garment in a product photo",
            "Hugging Face Spaces through the Gradio client: FLUX.1-schnell, IDM-VTON and CatVTON for realistic try-on photos",
            "FASHN API (optional) for fast paid try-on renders",
            "sharp (image processing), cheerio (HTML parsing), Express",
            "React, three.js, Vite, Render, GitHub Pages and Actions, Node's built-in test runner",
          ],
        },
      ],
    },
    {
      name: "iMET",
      kind: "macOS app · Security",
      color: "#22d3ee",
      summary:
        "Send an iMessage that looks like ordinary chatter (\"hey! how's your vacation going?\") but secretly carries a real, encrypted message. Only someone with the same shared code can read it. The desktop app encrypts, hides and sends for you, and decrypts hidden replies right in the conversation.",
      tags: ["Python", "AES-256-GCM", "Steganography", "AppleScript", "SQLite"],
      links: {
        live: "",
        code: "https://github.com/ARogers8/iMET",
      },
      sections: [
        {
          title: "Technical description",
          items: [
            "Written in Python, with a Tkinter desktop app, a command-line tool and a clipboard watcher that all share one engine.",
            "Encryption: AES-256-GCM, with the key derived from the shared code using scrypt. Every message gets a fresh random salt and nonce, so the content is secret and tamper-evident.",
            "Steganography: the encrypted bytes are encoded as invisible zero-width Unicode characters and tucked inside a normal-looking cover sentence, which hides that a secret message exists at all.",
            "There's no supported way inside iMessage, so iMET drives it from the outside: it sends through the Messages app with AppleScript and reads replies by polling the local Messages database.",
            "The two devices never exchange keys over the network. They only need the same code, shared once in person.",
          ],
        },
        {
          title: "Data storage",
          items: [
            "The shared code stays in memory for the session and is never sent anywhere. The CLI can optionally save it to ~/.imet/code with owner-only (0600) permissions.",
            "Contacts are saved to ~/.imet/contacts.json, which holds names and handles only, no secrets.",
            "Incoming messages are read from macOS's Messages database (chat.db, SQLite) in read-only mode.",
          ],
        },
        {
          title: "Tools & APIs",
          items: [
            "Python cryptography library (AESGCM, scrypt)",
            "AppleScript via osascript to control the Messages app",
            "sqlite3 for reading the Messages database",
            "Tkinter (desktop UI), pyperclip (clipboard mode)",
            "pytest, setuptools packaging with installable commands",
          ],
        },
      ],
    },
    {
      name: "Cinedle",
      kind: "Web game",
      color: "#ff6b5a",
      summary:
        "A daily movie-guessing game in the style of Wordle. Guess the film from one famous quote, or from six stills that get easier with every wrong guess. It has four difficulty levels, a daily puzzle that's the same for everyone with streaks and a shareable result grid, and an endless mode.",
      tags: ["JavaScript", "HTML/CSS", "TMDB API", "GitHub Actions"],
      links: {
        live: "",
        code: "https://github.com/ARogers8/Cinedle",
      },
      sections: [
        {
          title: "Technical description",
          items: [
            "Plain HTML, CSS and JavaScript with no framework and no build step, hosted as a static site.",
            "The daily puzzle is picked with a seeded random number generator keyed to the date, so every player gets the same movie without a server.",
            "Each wrong guess unlocks the next hint (year, character, actor, first letter) or an easier still. Guessing uses a search dropdown with decoy titles mixed in.",
            "Movie stills come from a GitHub Actions workflow. It runs a Node script that asks TMDB for six frames per movie, orders them from obscure to iconic, and commits the image links to the repo. It only fetches newly added movies.",
            "The TMDB key lives in GitHub's encrypted secrets, so it never reaches players' browsers.",
          ],
        },
        {
          title: "Data storage",
          items: [
            "Game content (quotes, movies, hints) lives in JavaScript data files that ship with the site.",
            "Still-frame links are generated into a data file by the build workflow. Hand-picked frames can override them per movie.",
            "Streaks, stats, settings and today's progress are saved in the browser's localStorage. There's no server or database.",
          ],
        },
        {
          title: "Tools & APIs",
          items: [
            "TMDB API: movie stills and metadata",
            "GitHub Actions with encrypted secrets for the stills build",
            "Node.js build script, GitHub Pages hosting",
          ],
        },
      ],
    },
  ],

  labs: [
    {
      name: "Example Lab: Active Directory Home Lab",
      course: "Course name or 'Personal lab'",
      date: "Fall 2026",
      summary: "What you set up and why.",
      tools: ["VirtualBox", "Windows Server 2022", "PowerShell"],
      steps: [
        "Installed Windows Server and promoted it to a domain controller",
        "Created OUs, users and group policies",
        "Joined a Windows 11 client to the domain",
      ],
      link: "", // writeup, repo, or screenshots
    },
    {
      name: "Example Lab: Network Traffic Analysis",
      course: "Course name",
      date: "Spring 2026",
      summary: "What you analyzed and what you found.",
      tools: ["Wireshark", "Nmap"],
      steps: ["Captured traffic", "Filtered by protocol", "Identified a suspicious host"],
      link: "",
    },
  ],

  contact: {
    blurb: "Email is the fastest way to reach me. I usually reply within a day.",
    email: "you@example.com",
    phone: "", // optional
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/ARogers8",
  },
};
