// ===== Рендеринг та фільтрація каталогу =====
import { ITEMS, formatPrice } from "./data.js";

export function initCatalog() {
  const box = document.getElementById("items");
  if (!box) return;

  // Рендер карток
  box.innerHTML = ITEMS.map((item) => `
    <article class="card item" data-k="${item.k}">
      <div class="pic" style="background:linear-gradient(150deg,${item.c.split(",")[0]},${item.c.split(",")[1]})"></div>
      <div class="body">
        <h3>${item.t}</h3>
        <p>${item.d}</p>
        <div class="price">від ${formatPrice(item.p)} грн/кв.м</div>
      </div>
    </article>
  `).join("");

  // Обробка табів фільтрації
  const tabButtons = document.querySelectorAll(".tabs button");
  tabButtons.forEach((btn) => {
    btn.onclick = () => {
      tabButtons.forEach((x) => x.setAttribute("aria-pressed", x === btn));
      const filter = btn.dataset.f;
      box.querySelectorAll(".item").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.k !== filter;
      });
    };
  });
}
