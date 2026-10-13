// Renders the site from content.js. You normally don't need to edit this file.
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") node.textContent = v;
      else if (k === "class") node.className = v;
      else node.setAttribute(k, v);
    }
    for (const c of [].concat(children)) if (c) node.append(c);
    return node;
  }

  function button(label, href, primary) {
    const external = /^https?:/.test(href);
    return el("a", {
      class: primary ? "btn btn-primary" : "btn",
      href,
      text: label,
      ...(external ? { target: "_blank", rel: "noopener" } : {}),
    });
  }

  function chips(items, cls = "chips") {
    return el("ul", { class: cls }, (items || []).map((t) => el("li", { text: t })));
  }

  // ---- About ----
  document.title = `${S.name} · Portfolio`;
  $("brand").textContent = S.name;
  $("name").textContent = S.name;
  $("title").textContent = S.title;
  $("available").textContent = S.available || "";
  $("photo").src = S.photo;
  $("photo").alt = `Photo of ${S.name}`;
  $("footer-text").textContent = `© ${new Date().getFullYear()} ${S.name}`;

  const actions = $("hero-actions");
  actions.append(button("Get in touch", "#contact", true));
  actions.append(button("See projects", "#projects"));
  if (S.resume) actions.append(button("Résumé", S.resume));

  S.about.paragraphs.forEach((p) => $("bio").append(el("p", { text: p })));
  S.about.facts.forEach((f) => {
    $("facts").append(el("dt", { text: f.label }), el("dd", { text: f.value }));
  });
  $("skills").replaceWith(chips(S.about.skills));
  if (S.about.certifications && S.about.certifications.length) {
    $("certs-block").hidden = false;
    S.about.certifications.forEach((c) => $("certs").append(el("li", { text: c })));
  }

  // ---- Projects ----
  function detailRow(label, content) {
    if (!content || (Array.isArray(content) && !content.length)) return null;
    const body = Array.isArray(content)
      ? el("ul", { class: "list" }, content.map((t) => el("li", { text: t })))
      : el("p", { text: content });
    return el("div", { class: "detail" }, [el("h4", { text: label }), body]);
  }

  S.projects.forEach((p) => {
    const d = p.details || {};
    const links = el("div", { class: "actions" }, [
      p.links.live && button("Live site", p.links.live, true),
      p.links.code && button("Source code", p.links.code),
    ]);
    const item = el("details", { class: "project card" }, [
      el("summary", {}, [
        el("div", { class: "project-head" }, [
          el("h3", { text: p.name }),
          el("p", { class: "muted", text: p.summary }),
          chips(p.tags, "chips small"),
        ]),
        el("span", { class: "chev", "aria-hidden": "true" }),
      ]),
      el("div", { class: "project-body" }, [
        detailRow("Overview", d.overview),
        el("div", { class: "detail-grid" }, [
          detailRow("How data is stored", d.dataStorage),
          detailRow("Tools & technologies", d.tools),
          detailRow("APIs used", d.apis),
          detailRow("Highlights", d.highlights),
        ]),
        links,
      ]),
    ]);
    $("project-list").append(item);
  });

  // ---- Labs ----
  S.labs.forEach((l) => {
    $("lab-list").append(
      el("article", { class: "card lab" }, [
        el("p", { class: "eyebrow", text: [l.course, l.date].filter(Boolean).join(" · ") }),
        el("h3", { text: l.name }),
        el("p", { text: l.summary }),
        l.steps && l.steps.length && el("ol", { class: "list" }, l.steps.map((s) => el("li", { text: s }))),
        chips(l.tools, "chips small"),
        l.link && el("div", { class: "actions" }, [button("View writeup", l.link)]),
      ])
    );
  });

  // ---- Contact ----
  const C = S.contact;
  $("contact-blurb").textContent = C.blurb;
  const rows = [
    C.email && ["Email", C.email, `mailto:${C.email}`],
    C.phone && ["Phone", C.phone, `tel:${C.phone.replace(/[^\d+]/g, "")}`],
    C.linkedin && ["LinkedIn", C.linkedin.replace(/^https?:\/\/(www\.)?/, ""), C.linkedin],
    C.github && ["GitHub", C.github.replace(/^https?:\/\/(www\.)?/, ""), C.github],
  ].filter(Boolean);
  rows.forEach(([label, text, href]) => {
    const a = el("a", { class: "card contact-item", href }, [
      el("span", { class: "eyebrow", text: label }),
      el("span", { class: "contact-value", text }),
    ]);
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    $("contact-list").append(a);
  });

  // ---- Tabs (hash-based, so links like yoursite.com/#projects work) ----
  const tabs = ["about", "projects", "labs", "contact"];
  function show() {
    const id = tabs.includes(location.hash.slice(1)) ? location.hash.slice(1) : "about";
    tabs.forEach((t) => {
      $(t).hidden = t !== id;
      const link = document.querySelector(`[data-tab="${t}"]`);
      link.setAttribute("aria-selected", t === id);
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);
  show();
})();
