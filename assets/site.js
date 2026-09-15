const header = document.querySelector(".site-header");

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");

    // Animate hamburger → X
    menuBtn.classList.toggle("active", isOpen);sss

    // Accessibility
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close menu when clicking a navigation link

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");

      menuBtn.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });

  // Reset menu when returning to desktop

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      nav.classList.remove("active");

      menuBtn.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });
}

/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
});

/* =========================================
   ACTIVE NAVIGATION
========================================= */

document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.pathname === window.location.pathname) {
    link.classList.add("active");
  }
});

/* =========================================
   REVEAL ANIMATION
========================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

/* =========================================
   PORTFOLIO FILTER
========================================= */

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.remove("active"));

    button.classList.add("active");

    const value = button.dataset.filter;

    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = value !== "all" && card.dataset.category !== value;
    });
  });
});

/* =========================================
   DEMO FORM
========================================= */

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent =
        "Thanks — your enquiry has been captured for this demo. Connect the form to your preferred backend before launch.";
    }

    form.reset();
  });
});
