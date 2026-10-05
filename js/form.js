// ===== Валідація та відправка форм =====
import { FORM_ENDPOINT, EMAIL } from "./config.js";

export function initForms() {
  const forms = document.querySelectorAll(".lead-form");

  forms.forEach((form) => {
    const phoneInput = form.phone;
    const msg = form.querySelector(".msg");

    // Фільтрація вводу для номера телефону
    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/[^\d+\s()-]/g, "");
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const phoneDigits = phoneInput.value.replace(/\D/g, "");

      const isNameValid = name.length >= 2;
      const isPhoneValid = phoneDigits.length >= 10;

      form.name.classList.toggle("err", !isNameValid);
      phoneInput.classList.toggle("err", !isPhoneValid);
      msg.className = "msg";

      if (!isNameValid || !isPhoneValid) {
        msg.classList.add("bad");
        msg.textContent = "Вкажіть ім’я та номер телефону (мінімум 10 цифр).";
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Надсилаємо…";
      }

      try {
        if (FORM_ENDPOINT) {
          const res = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name,
              phone: phoneInput.value,
              source: window.location.href
            })
          });

          if (!res.ok) throw new Error("Помилка запиту");
        } else {
          // Відкриття поштового клієнта, якщо endpoint не налаштовано
          const subject = encodeURIComponent("Заявка на замір");
          const body = encodeURIComponent(`Ім’я: ${name}\nТелефон: ${phoneInput.value}`);
          window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        }

        msg.classList.add("ok");
        msg.textContent = "Дякуємо! Ми зв’яжемось з вами найближчим часом.";
        form.reset();
      } catch (err) {
        msg.classList.add("bad");
        msg.textContent = "Не вдалося відправити. Зателефонуйте: 050 181-75-72.";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Відправити заявку";
        }
      }
    });
  });
}
