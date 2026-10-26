// Renders the site from content.js. You normally don't need to edit this file.
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") node.textContent = v;
      else if (k === "class") node.className = v;
      else if (k === "style") node.style.cssText = v;
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

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // ---- About ----
  document.title = `${S.name} · Portfolio`;
  $("brand").textContent = S.name;
  $("name").textContent = S.name;
  $("role").textContent = S.role;
  $("available").textContent = S.available || "";
  $("photo").src = S.photo;
  $("photo").alt = `Photo of ${S.name}`;
  $("footer-text").textContent = `© ${new Date().getFullYear()} ${S.name}`;

  const actions = $("hero-actions");
  actions.append(button("See my projects", "#projects", true));
  actions.append(button("Get in touch", "#contact"));
  if (S.resume) actions.append(button("Résumé", S.resume));

  S.about.paragraphs.forEach((p) => $("bio").append(el("p", { text: p })));
  S.about.facts.forEach((f) => {
    $("facts").append(el("div", {}, [el("dt", { class: "mono", text: f.label }), el("dd", { text: f.value })]));
  });
  $("skills").replaceWith(chips(S.about.skills));
  if (S.about.certifications && S.about.certifications.length) {
    $("certs-block").hidden = false;
    S.about.certifications.forEach((c) => $("certs").append(el("li", { text: c })));
  }

  // Featured strip on the About tab: one tile per project.
  S.projects.forEach((p) => {
    $("featured").append(
      el("a", { class: "tile", href: `#projects`, "data-project": slug(p.name), style: `--c:${p.color}` }, [
        el("span", { class: "tile-kind mono", text: p.kind }),
        el("span", { class: "tile-name", text: p.name }),
        el("span", { class: "tile-arrow", "aria-hidden": "true", text: "→" }),
      ])
    );
  });

  // ---- Projects ----
  S.projects.forEach((p, n) => {
    const id = slug(p.name);
    const panels = el("div", { class: "drawers" });
    const toggles = el("div", { class: "toggles" });

    (p.sections || []).forEach((sec, i) => {
      const panelId = `${id}-sec-${i}`;
      const btn = el("button", { class: "toggle", type: "button", "aria-expanded": "false", "aria-controls": panelId }, [
        el("span", { class: "toggle-icon", "aria-hidden": "true" }),
        el("span", { text: sec.title }),
      ]);
      const body = Array.isArray(sec.items)
        ? el("ul", { class: "drawer-list" }, sec.items.map((t) => el("li", { text: t })))
        : el("p", { text: sec.text || "" });
      const drawer = el("div", { class: "drawer", id: panelId, role: "region", "aria-label": `${p.name}: ${sec.title}` }, [
        el("div", { class: "drawer-inner" }, [
          el("div", { class: "drawer-box" }, [el("h4", { class: "mono", text: sec.title }), body]),
        ]),
      ]);
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        drawer.classList.toggle("open", !open);
      });
      toggles.append(btn);
      panels.append(drawer);
    });

    const links = el("div", { class: "actions" }, [
      p.links.live && button("Live site ↗", p.links.live, true),
      p.links.code && button("Source code ↗", p.links.code),
    ]);

    $("project-list").append(
      el("article", { class: "project", id: `project-${id}`, style: `--c:${p.color}` }, [
        el("div", { class: "project-index mono", text: String(n + 1).padStart(2, "0") }),
        el("div", { class: "project-main" }, [
          el("p", { class: "project-kind mono", text: p.kind }),
          el("h2", { class: "project-name", text: p.name }),
          el("p", { class: "project-summary", text: p.summary }),
          chips(p.tags, "chips small"),
          links,
          toggles,
          panels,
        ]),
      ])
    );
  });

  // ---- Labs ----
  S.labs.forEach((l) => {
    $("lab-list").append(
      el("article", { class: "lab" }, [
        el("p", { class: "project-kind mono", text: [l.course, l.date].filter(Boolean).join(" · ") }),
        el("h3", { text: l.name }),
        el("p", { class: "muted", text: l.summary }),
        l.steps && l.steps.length && el("ol", { class: "steps" }, l.steps.map((s) => el("li", { text: s }))),
        chips(l.tools, "chips small"),
        l.link && el("div", { class: "actions" }, [button("View writeup ↗", l.link)]),
      ])
    );
  });

  // ---- Contact ----
  const C = S.contact;
  $("contact-blurb").textContent = C.blurb;
  const rows = [
    C.email && ["Email", C.email, `mailto:${C.email}`, true],
    C.phone && ["Phone", C.phone, `tel:${C.phone.replace(/[^\d+]/g, "")}`, true],
    C.linkedin && ["LinkedIn", C.linkedin.replace(/^https?:\/\/(www\.)?/, ""), C.linkedin],
    C.github && ["GitHub", C.github.replace(/^https?:\/\/(www\.)?/, ""), C.github],
  ].filter(Boolean);
  rows.forEach(([label, text, href, copyable]) => {
    const card = el("div", { class: "contact-item" }, [
      el("span", { class: "contact-label mono", text: label }),
      el("a", { class: "contact-value", href, text, ...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener" } : {}) }),
    ]);
    if (copyable) {
      const copy = el("button", { class: "copy mono", type: "button", text: "Copy" });
      copy.addEventListener("click", () => {
        const done = () => { copy.textContent = "Copied"; setTimeout(() => (copy.textContent = "Copy"), 1600); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
      });
      card.append(copy);
    }
    $("contact-list").append(card);
  });

  // ---- Tabs (hash-based, so links like yoursite.com/#projects work) ----
  const tabs = ["about", "projects", "labs", "contact"];
  function show(scrollTarget) {
    const id = tabs.includes(location.hash.slice(1)) ? location.hash.slice(1) : "about";
    tabs.forEach((t) => {
      $(t).hidden = t !== id;
      document.querySelector(`[data-tab="${t}"]`).setAttribute("aria-current", t === id ? "page" : "false");
    });
    const target = scrollTarget && document.getElementById(scrollTarget);
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }
  // Featured tiles jump to their project on the Projects tab.
  document.querySelectorAll(".tile").forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, "", "#projects");
      show(`project-${t.dataset.project}`);
    })
  );
  window.addEventListener("hashchange", () => show());
  window.addEventListener("popstate", () => show());
  show();
})();
