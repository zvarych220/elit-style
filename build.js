/**
 * Збирач компонентів index.html з папки components/
 * Запуск: node build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const OUTPUT_FILE = path.join(ROOT_DIR, 'index.html');

const template = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Натяжні стелі в Івано-Франківську — Еліт Стайл</title>
  <meta name="description" content="Проектування, продаж та монтаж натяжних стель в Івано-Франківську. Безкоштовний замір, гарантія 12 років, монтаж до 5 днів.">
  
  <!-- Модульні стилі -->
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <!-- @include header.html -->
{{header}}

  <main id="top">
    <!-- @include hero.html -->
{{hero}}

    <!-- @include benefits.html -->
{{benefits}}

    <!-- @include catalog.html -->
{{catalog}}

    <!-- @include calculator.html -->
{{calculator}}

    <!-- @include steps.html -->
{{steps}}

    <!-- @include certificates.html -->
{{certificates}}

    <!-- @include faq.html -->
{{faq}}

    <!-- @include cta.html -->
{{cta}}
  </main>

  <!-- @include footer.html -->
{{footer}}

  <!-- Модульний скрипт -->
  <script type="module" src="/js/main.js"></script>
</body>
</html>
`;

function getComponent(name) {
  const filePath = path.join(COMPONENTS_DIR, name);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8').trim();
  }
  console.warn(`Увага: компонент ${name} не знайдено.`);
  return '';
}

const result = template
  .replace('{{header}}', getComponent('header.html'))
  .replace('{{hero}}', getComponent('hero.html'))
  .replace('{{benefits}}', getComponent('benefits.html'))
  .replace('{{catalog}}', getComponent('catalog.html'))
  .replace('{{calculator}}', getComponent('calculator.html'))
  .replace('{{steps}}', getComponent('steps.html'))
  .replace('{{certificates}}', getComponent('certificates.html'))
  .replace('{{faq}}', getComponent('faq.html'))
  .replace('{{cta}}', getComponent('cta.html'))
  .replace('{{footer}}', getComponent('footer.html'));

fs.writeFileSync(OUTPUT_FILE, result, 'utf8');
console.log('✅ index.html успішно оновлено з компонентів!');
