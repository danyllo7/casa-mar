/* ==========================================================================
   Casa do Mar — script.js (vanilla JS, sem dependências)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Navbar: estado ao rolar ---------- */
  var navbar = document.getElementById("navbar");
  function onScrollNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
  document.addEventListener("scroll", onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* ---------- Menu mobile (hamburger) ---------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Menu: tabs ---------- */
  var tabButtons = document.querySelectorAll(".tab-btn");
  var tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");

      tabButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      tabPanels.forEach(function (panel) {
        var isTarget = panel.id === "tab-" + target;
        panel.classList.toggle("is-active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  /* ---------- Galeria: lightbox ---------- */
  var galleryItems = document.querySelectorAll(".gallery-item");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var full = item.getAttribute("data-full");
      var img = item.querySelector("img");
      openLightbox(full, img ? img.alt : "");
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Reservas: validação do formulário ---------- */
  var form = document.getElementById("reservationForm");
  var confirmation = document.getElementById("formConfirmation");

  var dateInput = document.getElementById("resDate");
  if (dateInput) {
    var today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  var validators = {
    resName: function (v) { return v.trim().length >= 2 ? "" : "Indique o seu nome completo."; },
    resPhone: function (v) { return /^[+\d][\d\s]{7,}$/.test(v.trim()) ? "" : "Indique um número de telefone válido."; },
    resEmail: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Indique um email válido."; },
    resGuests: function (v) { var n = Number(v); return n >= 1 && n <= 20 ? "" : "Indique entre 1 e 20 pessoas."; },
    resDate: function (v) { return v ? "" : "Escolha uma data."; },
    resTime: function (v) { return v ? "" : "Escolha uma hora."; }
  };

  function validateField(id) {
    var field = document.getElementById(id);
    var errorEl = document.getElementById("err-" + id);
    field.setAttribute("data-touched", "true");
    var message = validators[id](field.value);
    errorEl.textContent = message;
    return !message;
  }

  Object.keys(validators).forEach(function (id) {
    var field = document.getElementById(id);
    field.addEventListener("blur", function () { validateField(id); });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      confirmation.hidden = true;

      var allValid = Object.keys(validators)
        .map(validateField)
        .every(Boolean);

      if (!allValid) {
        var firstInvalid = form.querySelector('[data-touched="true"]:invalid, .field-error:not(:empty)');
        var firstField = document.querySelector(".field-error:not(:empty)");
        if (firstField) {
          var relatedInput = document.getElementById(firstField.id.replace("err-", ""));
          if (relatedInput) relatedInput.focus();
        }
        return;
      }

      /* Demonstração: sem envio para backend. */
      confirmation.hidden = false;
      confirmation.textContent = "Obrigado! O seu pedido de reserva foi recebido. Entraremos em contacto para confirmar a disponibilidade.";
      form.reset();
      Object.keys(validators).forEach(function (id) {
        document.getElementById("err-" + id).textContent = "";
        document.getElementById(id).removeAttribute("data-touched");
      });
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

})();
