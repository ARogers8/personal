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
 * ============================================================
 */

window.SITE = {
  name: "Your Name",
  title: "IT Student · Aspiring Systems & Software Engineer",
  // Put your photo in the "assets" folder and update the file name here.
  photo: "assets/photo.svg",
  resume: "", // e.g. "assets/resume.pdf" — leave "" to hide the button
  available: "Open to internships and entry-level IT roles",

  about: {
    paragraphs: [
      "I'm an Information Technology student at [Your University], graduating [Month Year]. I like building things that solve real problems, from networks and servers to full-stack web apps.",
      "I'm looking for an internship or entry-level role in [IT support / networking / cloud / software development]. I learn fast, document everything, and enjoy working on a team.",
    ],
    facts: [
      { label: "School", value: "[Your University]" },
      { label: "Major", value: "Information Technology" },
      { label: "Graduating", value: "[Month Year]" },
      { label: "Location", value: "[City, State]" },
    ],
    skills: [
      "Python", "JavaScript", "HTML/CSS", "SQL", "Linux",
      "Windows Server", "Networking (TCP/IP)", "Git & GitHub", "AWS",
    ],
    certifications: [
      // e.g. "CompTIA A+ (2025)"
    ],
  },

  projects: [
    {
      name: "Example Project One",
      summary: "One or two sentences on what it does and who it's for.",
      tags: ["Python", "Flask", "SQLite"],
      links: {
        live: "",
        code: "https://github.com/ARogers8",
      },
      details: {
        overview: "A longer explanation: the problem, what you built, and what you're proud of.",
        dataStorage: "How data is stored, e.g. a SQLite database with tables for users and tasks; passwords hashed with bcrypt.",
        tools: ["VS Code", "Git", "Flask", "Bootstrap"],
        apis: ["OpenWeather API: pulls the current forecast"],
        highlights: [
          "Something you learned or a hard problem you solved",
          "A measurable result, if you have one",
        ],
      },
    },
    {
      name: "Example Project Two",
      summary: "One or two sentences on what it does and who it's for.",
      tags: ["JavaScript", "Firebase"],
      links: {
        live: "",
        code: "https://github.com/ARogers8",
      },
      details: {
        overview: "A longer explanation of the project.",
        dataStorage: "e.g. Firebase Firestore document collections, synced in real time.",
        tools: ["React", "Vite", "Firebase Hosting"],
        apis: ["Firebase Auth", "Google Maps JavaScript API"],
        highlights: ["What makes this project interesting"],
      },
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
    blurb: "The best way to reach me is email. I usually reply within a day.",
    email: "you@example.com",
    phone: "", // optional
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/ARogers8",
  },
};
