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
  name: "Andrew Rogers",
  role: "IT student building apps with AI, 3D graphics and encryption",
  // Put your photo in the "assets" folder and update the file name here.
  photo: "assets/photo.jpg",
  resume: "", // put your PDF in assets and set this to "assets/resume.pdf"; leave "" to hide the résumé buttons
  available: "Open to internships and entry-level IT roles",

  about: {
    paragraphs: [
      "I'm an Information Technology student at James Madison University, graduating in December 2027. I build complete products end to end: a fitness tracker with an AI food logger, a 3D virtual try-on app, an encrypted messaging tool and a daily movie game.",
      "I'm looking for an internship or entry-level role in software development, networking or IT. I learn fast, document what I build, and like shipping things people actually use.",
    ],
    facts: [
      { label: "School", value: "James Madison University" },
      { label: "Major", value: "Information Technology" },
      { label: "Graduating", value: "Dec 2027" },
      { label: "Location", value: "Arlington, Virginia" },
    ],
    skills: [
      "JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js",
      "SQL / PostgreSQL", "Prisma", "three.js", "REST APIs", "Claude API",
      "Git & GitHub Actions", "Vercel", "Linux",
      "Routing (static, RIP)", "DNS / DHCP", "Wireshark", "NGINX",
    ],
    certifications: [
      // e.g. "CompTIA A+ (2025)"
    ],
  },

  projects: [
    {
      name: "ALLIN1",
      kind: "Full-stack web app",
      date: "Oct 2026", // when you built it
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
      date: "Oct 2026 – present", // when you built it
      status: "Work in progress", // shows as a badge; delete this line when it's done
      color: "#a78bfa",
      summary:
        "Try on clothes from any store on your own 3D model. Paste a link to a single piece (Zara pants, PacSun sneakers), pick your size, and see the whole outfit head to toe. It estimates how each size will fit you, and every piece is saved with a link back to buy it.",
      tags: ["React", "three.js", "Node.js", "Express", "Computer vision"],
      links: {
        live: "https://www.fitcheckai.dev",
        code: "https://github.com/ARogers8/fitcheck",
        note: "Hosted on a free server that sleeps when idle, so the first visit can take about a minute to load.",
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
      date: "Oct 2026", // when you built it
      color: "#22d3ee",
      summary:
        "Send an iMessage that looks like ordinary chatter (\"hey! how's your vacation going?\") but secretly carries a real, encrypted message. Only someone with the same shared code can read it. The desktop app encrypts, hides and sends for you, and decrypts hidden replies right in the conversation.",
      tags: ["Python", "AES-256-GCM", "Steganography", "AppleScript", "SQLite"],
      links: {
        live: "",
        code: "https://github.com/ARogers8/iMET",
        note: "iMET is a Mac desktop app, so there's no web page to visit. Open \"How to set it up\" below to install it.",
      },
      sections: [
        {
          title: "How it works",
          ordered: true,
          items: [
            "You and the other person agree on a secret code once, in person (iMET can generate a 6-word one).",
            "You type your real message, for example `meet me at the pier at 8`.",
            "iMET encrypts it with the code and hides the result as invisible characters inside a harmless cover message like `hey! how's your vacation going?`.",
            "The cover message is sent through iMessage like any other text. Anyone who sees it, on either phone or in a notification, only sees the cover message.",
            "On the other end, iMET spots the hidden payload, decrypts it with the same code and shows the real message in the conversation. Without the code it can't be read, and any tampering makes decryption fail.",
          ],
        },
        {
          title: "How to set it up",
          ordered: true,
          items: [
            "You need a Mac signed in to iMessage in the Messages app, and Python 3.9 or newer (the python.org installer includes the Tkinter window toolkit iMET uses).",
            "Download the code: `git clone https://github.com/ARogers8/iMET` then `cd iMET`.",
            "Install it: `pip install -e .`",
            "Make a shared code with `imet newcode` and give it to the other person in person. They install iMET the same way.",
            "Start the app with `imet-app`, type the shared code and click Unlock. The code is only kept in memory while the app is open.",
            "Click Add contact and enter their name and iMessage phone number (like `+15551234567`) or Apple ID email.",
            "Type a message and click Send. The first time, macOS asks to let Terminal or Python control Messages. Click OK.",
            "To see their replies decrypted, give the app running iMET Full Disk Access in System Settings, Privacy & Security, Full Disk Access. iMET only reads your messages database, never changes it. Sending works without this step.",
            "Optional: `imet watch` runs a clipboard mode for other chat apps. Copy `>> your secret` and paste the cover text it puts on your clipboard.",
          ],
        },
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
      date: "Oct 2026", // when you built it
      color: "#ff6b5a",
      summary:
        "A daily movie-guessing game in the style of Wordle. Guess the film from one famous quote, or from six stills that get easier with every wrong guess. It has four difficulty levels, a daily puzzle that's the same for everyone with streaks and a shareable result grid, and an endless mode.",
      tags: ["JavaScript", "HTML/CSS", "TMDB API", "GitHub Actions"],
      links: {
        live: "https://www.cinedle.dev",
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

  // Course labs are summarized here, not linked, so the reports can't be copied by
  // future students. "report" is shown as a note instead of a download.
  labs: [
    {
      name: "Static & Dynamic Routing",
      number: "Lab 1",
      course: "IT 333 · Advanced Networking for IT",
      date: "Sep 2026",
      summary:
        "Built a small multi-network lab out of Linux virtual machines and got traffic flowing between them three ways: through a software bridge, with hand-written static routes, and with routers that learn routes from each other.",
      tools: ["VMware", "Linux", "FRRouting", "RIP", "Wireshark", "iproute2", "ipcalc"],
      report: "51-page team report with screenshots and packet captures",
      sections: [
        {
          title: "What I did",
          items: [
            "Cloned and wired up host, bridge and router VMs across separate virtual networks (vmnets) and LAN segments.",
            "Turned a Linux VM into a learning Ethernet bridge and confirmed two hosts could talk through it.",
            "Planned subnets with ipcalc and showed why hosts on different network IDs can't reach each other directly.",
            "Configured two Linux routers with IP forwarding and static routes, and traced each failed ping to the missing route that caused it.",
            "Installed FRRouting and replaced the static routes with dynamic routing, then watched the routers advertise routes to each other.",
            "Captured and explained the traffic at every hop in Wireshark.",
          ],
        },
        {
          title: "Key takeaways",
          items: [
            "Static routing is precise but fully manual. Dynamic routing lets routers share what they know and adapt automatically.",
            "Reading routing tables (ip route) and ARP/neighbor tables is the fastest way to find where a packet stops.",
          ],
        },
      ],
    },
    {
      name: "ARP, DNS & DHCP",
      number: "Lab 2",
      course: "IT 333 · Advanced Networking for IT",
      date: "Sep 2026",
      summary:
        "Took apart the services every network depends on: how a host finds a neighbor's hardware address, how a name becomes an IP address, and how devices get an address automatically, even across routers.",
      tools: ["Wireshark", "dig", "nslookup", "resolvectl", "arping", "ISC DHCP server", "Linux"],
      report: "53-page team report with screenshots and packet captures",
      sections: [
        {
          title: "What I did",
          items: [
            "Captured ARP request/reply exchanges in Wireshark and proved how ICMP traffic fills the ARP cache.",
            "Compared local name resolution (/etc/hosts and mDNS) with real DNS lookups.",
            "Walked a DNS lookup by hand with dig, from a root server to the .edu servers to the university's authoritative server.",
            "Inspected the system resolver and queried a public DNS server directly to compare answers and ports.",
            "Set up an ISC DHCP server, read its lease files, and traced the full Discover, Offer, Request and Acknowledge exchange.",
            "Configured a DHCP relay so hosts on another subnet could get addresses, and showed the relay turning a broadcast into a routed unicast.",
          ],
        },
        {
          title: "Key takeaways",
          items: [
            "Recursive vs. iterative DNS resolution, and the role of resolvers, root and authoritative servers.",
            "Routers block broadcasts, so DHCP needs relay agents to serve more than one subnet.",
          ],
        },
      ],
    },
    {
      name: "Web Architecture & REST APIs",
      number: "Lab 3",
      course: "IT 333 · Advanced Networking for IT",
      date: "Oct 2026",
      summary:
        "Built and compared three generations of web app on Linux servers: a classic form-and-reload site, the same site using AJAX, and a REST API, then watched each one on the wire to see what actually changes.",
      tools: ["NGINX", "PHP", "MySQL", "MongoDB", "Node.js", "Express", "Postman", "Wireshark"],
      report: "56-page team report with screenshots and packet captures",
      sections: [
        {
          title: "What I did",
          items: [
            "Configured an NGINX web server with PHP and a database, and verified listening services with ss and netstat.",
            "Built pages that submit and display database records, and traced each request from the browser to the database in Wireshark.",
            "Rebuilt the lookup with AJAX (XMLHttpRequest returning JSON) and compared the flow graphs with and without it.",
            "Built a REST API with Node.js, Express and MongoDB, with a data model, routes and a controller.",
            "Tested every endpoint (GET, POST, PATCH, DELETE) in Postman and confirmed the results in the database.",
          ],
        },
        {
          title: "Key takeaways",
          items: [
            "AJAX updates part of a page without a full reload, which changes the traffic as much as the user experience.",
            "REST APIs are the backbone of most modern web apps, and building one end to end made each layer concrete.",
          ],
        },
      ],
    },
  ],

  contact: {
    blurb: "Email is the fastest way to reach me. I usually reply within a day.",
    email: "roger5am@dukes.jmu.edu",
    phone: "", // optional
    linkedin: "https://www.linkedin.com/in/andrew-r-b19b5434b/",
    github: "https://github.com/ARogers8",
  },
};
