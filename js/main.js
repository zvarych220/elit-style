// ===== Головна точка входу додатку =====
import { initMenu } from "./menu.js";
import { initCatalog } from "./catalog.js";
import { initCalculator } from "./calculator.js";
import { initForms } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCatalog();
  initCalculator();
  initForms();
});
