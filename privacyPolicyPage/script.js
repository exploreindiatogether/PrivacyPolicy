/**
 * Beauty Camera - Privacy Policy Scripts
 * Handles Dark/Light Mode, Table of Contents ScrollSpy, Progress Bar & Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or match system preference
  const savedTheme = localStorage.getItem("bc_privacy_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(activeTheme);
      localStorage.setItem("bc_privacy_theme", activeTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    if (!themeToggleBtn) return;
    
    // Update button icon: Sun for dark mode (click to switch to light), Moon for light mode
    if (theme === "dark") {
      themeToggleBtn.innerHTML = `
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute("aria-label", "Switch to Light Theme");
      themeToggleBtn.title = "Switch to Light Theme";
    } else {
      themeToggleBtn.innerHTML = `
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute("aria-label", "Switch to Dark Theme");
      themeToggleBtn.title = "Switch to Dark Theme";
    }
  }

  // -------------------------------------------------------------------------
  // 2. Reading Progress Bar & Back-to-Top Button
  // -------------------------------------------------------------------------
  const progressBar = document.getElementById("progressBar");
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update progress bar percentage
    if (progressBar && scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle Back to Top button visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. ScrollSpy for Table of Contents
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll(".policy-section");
  const navLinks = document.querySelectorAll(".toc-link");

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-90px 0px -65% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // -------------------------------------------------------------------------
  // 4. Copy Email Helper
  // -------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll(".copy-email-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = btn.getAttribute("data-email") || "privacy@tejaslabs.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:16px;height:16px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> Copied!
        `;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
});
