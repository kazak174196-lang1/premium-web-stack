"use strict";
(() => {
  const nav = document.getElementById("main-nav");
  const toggle = document.getElementById("menu-toggle");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-message");
  const chatLog = document.getElementById("chat-log");
  const focusChat = document.getElementById("focus-chat");
  const specialtyButtons = [...document.querySelectorAll("[data-id]")];
  const finderForm = document.getElementById("finder-form");
  const finderFeedback = document.getElementById("finder-feedback");

  function closeMenu(restoreFocus = false) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    document.body.classList.remove("menu-open");
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) return closeMenu();
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    document.body.classList.add("menu-open");
    nav.querySelector("a")?.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      closeMenu(true);
    }
    if (event.key === "Tab" && toggle.getAttribute("aria-expanded") === "true") {
      const links = [...nav.querySelectorAll("a")];
      const first = links[0];
      const last = toggle;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
  window.addEventListener("resize", () => { if (window.innerWidth > 660) closeMenu(); });
  focusChat.addEventListener("click", () => setTimeout(() => chatInput.focus({ preventScroll:true }), 150));

  const addMessage = (message, kind) => {
    const bubble = document.createElement("p");
    bubble.className = "bubble " + kind;
    bubble.textContent = message;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  };
  document.querySelectorAll("[data-prompt]").forEach((button) => button.addEventListener("click", () => {
    chatInput.value = button.dataset.prompt || "";
    chatInput.focus();
  }));
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, "user");
    addMessage("Демонстрационный режим: ИИ ещё не подключён. Вопрос не отправлялся на сервер и не сохранялся. При тревожных симптомах обратитесь к ветеринару очно.", "system");
    chatInput.value = "";
    chatInput.focus({preventScroll:true});
  });

  specialtyButtons.forEach((button) => button.addEventListener("click", () => {
    specialtyButtons.forEach((other) => {
      other.classList.remove("is-active");
      other.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    document.getElementById("selected-name").textContent = button.dataset.name || "";
    document.getElementById("selected-description").textContent = button.dataset.description || "";
    finderFeedback.hidden = true;
    if (window.innerWidth < 660) {
      const heading = document.getElementById("selected-name");
      heading.setAttribute("tabindex", "-1");
    }
  }));
  finderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = document.getElementById("visit-city");
    if (!city.value.trim()) { city.focus(); return; }
    finderFeedback.hidden = false;
    finderFeedback.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});
  });
})();
