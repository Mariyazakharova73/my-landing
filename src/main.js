import Swiper from "swiper/bundle";
import "./style.css";

document.querySelectorAll(".cards__btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    const item = btn.closest(".cards__item");
    item.classList.add("hovered");
  });
  btn.addEventListener("mouseleave", () => {
    const item = btn.closest(".cards__item");
    item.classList.remove("hovered");
  });
});

let timeRemaining = 10 * 60;

const timerElement = document.getElementById("timer");

function updateTimer() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:00`;

  timeRemaining--;

  if (timeRemaining < 0) {
    timeRemaining = 10 * 60;
  }
}

setInterval(updateTimer, 1000);

const cardsItems = document.querySelectorAll(".cards__item");

function updateCardLayout() {
  cardsItems.forEach((card) => {
    const width = card.offsetWidth;

    if (width > 400) {
      card.style.flexDirection = "row";
      card.style.gap = "40px";
    } else {
      card.style.flexDirection = "column";
      card.style.gap = "0";
    }
  });
}

updateCardLayout();
window.addEventListener("resize", updateCardLayout);

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 0,
      spaceBetween: 0,
    },
  },
});

const hoverButton = document.querySelector(".cards__btn-try");

hoverButton.addEventListener("mouseenter", () => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    activeSlide.classList.add("hovered");
  }
});

hoverButton.addEventListener("mouseleave", () => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    activeSlide.classList.remove("hovered");
  }
});
