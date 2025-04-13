import Swiper from "swiper/bundle";

// Hover-эффект на карточки
document.querySelectorAll(".cards__btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => toggleCardHover(btn, true));
  btn.addEventListener("mouseleave", () => toggleCardHover(btn, false));
});

function toggleCardHover(button, isHovered) {
  const card = button.closest(".cards__item");
  if (card) card.classList.toggle("hovered", isHovered);
}

//  Таймер
let timeRemaining = 10 * 60;
const timerElement = document.getElementById("timer");

function updateTimer() {
  if (!timerElement) return;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:00`;

  timeRemaining--;
  if (timeRemaining < 0) timeRemaining = 10 * 60;
}

setInterval(updateTimer, 1000);

//  Адаптивное расположение карточек
const cardsItems = document.querySelectorAll(".cards__item");

function updateCardLayout() {
  cardsItems.forEach((card) => {
    const isWide = card.offsetWidth > 400;
    card.style.flexDirection = isWide ? "row" : "column";
    card.style.gap = isWide ? "40px" : "0";
  });
}

window.addEventListener("resize", updateCardLayout);
updateCardLayout();

// Swiper
let swiperInstance = null;

function initSwiper() {
  const isMobile = window.innerWidth <= 640;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".custom-pagination",
        clickable: true,
      },
    });
    console.log("Swiper активен");
  }

  if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    console.log("Swiper destroyed");
  }
}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", initSwiper);

//  Hover при наведении на кнопку слайдера
const hoverButton = document.querySelector(".cards__btn-try");

if (hoverButton) {
  hoverButton.addEventListener("mouseenter", () => toggleActiveSlideHover(true));
  hoverButton.addEventListener("mouseleave", () => toggleActiveSlideHover(false));
}

function toggleActiveSlideHover(isHovered) {
  if (!swiperInstance) {
    return;
  }

  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  const cardItem = activeSlide?.querySelector(".cards__item");

  if (cardItem) {
    cardItem.classList.toggle("hovered", isHovered);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const scene1 = document.getElementById("parallax-left");
  const scene2 = document.getElementById("parallax-right");

  if (!scene1 && !scene2) return;

  function updateParallax(event) {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    if (scene1) {
      const layer = scene1.querySelector("[data-depth]");
      if (layer) {
        const depth = parseFloat(layer.dataset.depth);
        gsap.to(layer, {
          x: deltaX * depth * 200,
          y: deltaY * depth * 200,
          ease: "power2.out",
          duration: 5,
        });
      }
    }

    if (scene2) {
      const layer = scene2.querySelector("[data-depth]");
      if (layer) {
        const depth = parseFloat(layer.dataset.depth);
        gsap.to(layer, {
          x: deltaX * depth * 200,
          y: deltaY * depth * 200,
          ease: "power2.out",
          duration: 5,
        });
      }
    }
  }

  document.addEventListener("mousemove", updateParallax);
});
