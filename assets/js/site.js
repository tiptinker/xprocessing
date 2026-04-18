const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const languageMenus = document.querySelectorAll("[data-language-menu]");
const siteHeader = document.querySelector(".site-header");

const getAnchorOffset = () => {
  const headerHeight = siteHeader?.getBoundingClientRect().height ?? 0;
  return headerHeight + 20;
};

const scrollToAnchor = (target, hash, updateHistory) => {
  const targetTop = window.scrollY + target.getBoundingClientRect().top - getAnchorOffset();

  if (updateHistory) {
    history.pushState(null, "", hash);
  }

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const hash = link.getAttribute("href");

  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToAnchor(target, hash, true);
  });
});

if (location.hash) {
  const initialTarget = document.querySelector(location.hash);

  if (initialTarget) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToAnchor(initialTarget, location.hash, false);
      });
    });
  }
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

if (languageMenus.length) {
  document.addEventListener("click", (event) => {
    languageMenus.forEach((menu) => {
      if (!menu.contains(event.target)) {
        menu.removeAttribute("open");
      }
    });
  });

  languageMenus.forEach((menu) => {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.removeAttribute("open");
      });
    });
  });
}