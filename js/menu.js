// ===== Логіка бургер-меню =====
export function initMenu() {
  const header = document.querySelector("header");
  if (!header) return;

  const burger = header.querySelector(".burger");
  if (!burger) return;

  const toggle = (isOpen) => {
    header.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
  };

  burger.onclick = () => toggle(!header.classList.contains("open"));

  header.querySelectorAll("nav a").forEach((a) => {
    a.onclick = () => toggle(false);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });
}
