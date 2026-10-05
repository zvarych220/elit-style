// ===== Логіка калькулятора вартості =====
import { ITEMS, formatPrice } from "./data.js";

export function initCalculator() {
  const typeSelect = document.getElementById("ctype");
  const areaInput = document.getElementById("carea");
  const sumDisplay = document.getElementById("csum");

  if (!typeSelect || !areaInput || !sumDisplay) return;

  // Заповнення випадаючого списку типами стель
  typeSelect.innerHTML = ITEMS.map((item, index) => 
    `<option value="${index}">${item.t} — від ${formatPrice(item.p)} грн</option>`
  ).join("");

  const calculate = () => {
    const area = Math.max(0, parseFloat(areaInput.value) || 0);
    const selectedItem = ITEMS[typeSelect.value] || ITEMS[0];
    const total = Math.round(area * selectedItem.p);
    sumDisplay.textContent = `${formatPrice(total)} грн`;
  };

  typeSelect.onchange = calculate;
  areaInput.oninput = calculate;

  // Початковий розрахунок
  calculate();
}
