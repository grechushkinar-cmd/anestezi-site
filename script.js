/* ============================================================
   AnesteZi — простой JavaScript
   Делает 3 вещи:
   1. Меняет шапку при прокрутке
   2. Плавно показывает блоки при их появлении на экране
   3. Делает плавную прокрутку по якорным ссылкам
   ============================================================ */

/* --- 1. Шапка становится непрозрачной при прокрутке --- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
});

/* --- 2. Анимация появления блоков (.reveal) ---
   Используем IntersectionObserver — он сам подсказывает,
   когда элемент стал виден в окне браузера. */
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealItems.forEach((item) => observer.observe(item));

/* --- 3. Плавная прокрутка по якорям #... --- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length <= 1) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
