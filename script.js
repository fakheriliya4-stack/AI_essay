// ۱) عناصر صفحه
const mainView = document.getElementById("main-view");
const horrorView = document.getElementById("horror-view");
const questionText = document.getElementById("question-text");
const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const exitButton = document.getElementById("exit-btn");
const confettiLayer = document.getElementById("confetti-layer");
const reviewButtons = document.querySelectorAll(".review-nav .btn");

// 2) کاغذ رنگی ها
const CONFETTI_COUNT = 40;
const CONFETTI_COLORS = ["#FFB52E", "#00FF66", "#FF304F", "#B517FF", "#2EC4FF", "#FFE94D"];
const CONFETTI_LIFETIME_MS = 4500;

// ۳) توابع کمکی
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// block: "start" یعنی ابتدای بخش بالای صفحه بیاید (برای باکس‌های بلند بهتر است)
function scrollToSection(id, block = "start") {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: block
  });
}

// ۴) کاغذرنگی: تعداد محدود و حذف خودکار
function launchConfetti() {
  if (confettiLayer.childElementCount > 0) return; // جلوگیری از انباشته‌شدن

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    confettiLayer.appendChild(piece);
  }

  setTimeout(() => confettiLayer.replaceChildren(), CONFETTI_LIFETIME_MS);
}

// ۵) دکمه «بله»
function handleYes() {
  questionText.textContent = "آفرینننن🥳";
  yesButton.disabled = true;
  noButton.disabled = true;
  launchConfetti();
}

// ۶) نمای ترسناک
function openHorrorView() {
  mainView.hidden = true;
  horrorView.hidden = false;
  horrorView.classList.remove("is-active");
  void horrorView.offsetWidth; // باعث می‌شود انیمیشن هر بار از اول شروع شود
  horrorView.classList.add("is-active");
  exitButton.focus();
}

function closeHorrorView() {
  horrorView.classList.remove("is-active");
  horrorView.hidden = true;
  mainView.hidden = false;
  scrollToSection("question-box", "center");
}

// ۷) اتصال ها
reviewButtons.forEach((button) => {
  button.addEventListener("click", () => scrollToSection(button.dataset.target));
});
yesButton.addEventListener("click", handleYes);
noButton.addEventListener("click", openHorrorView);
exitButton.addEventListener("click", closeHorrorView);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !horrorView.hidden) closeHorrorView();
});
