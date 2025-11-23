document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    nextBtn.click();
  }, 5000);

  const track = document.querySelector(".carousel-track");
  const cards = Array.from(track.children);
  const nextBtn = document.querySelector(".next-button");
  const prevBtn = document.querySelector(".prev-button");

  const cardWidth =
    cards[0].offsetWidth +
    (parseFloat(window.getComputedStyle(cards[0]).marginRight) || 0) +
    (parseFloat(window.getComputedStyle(cards[0]).marginLeft) || 0);

  let currentIndex = 0;
  const totalCards = cards.length;
  let isTransitioning = false;

  function updateCarousel() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function moveToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = index;
    updateCarousel();

    track.addEventListener(
      "transitionend",
      () => {
        isTransitioning = false;
      },
      { once: true }
    );
  }

  nextBtn.addEventListener("click", () => {
    if (isTransitioning) return;

    if (currentIndex === totalCards - 1) {
      moveToSlide(0);
    } else {
      moveToSlide(currentIndex + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (isTransitioning) return;

    if (currentIndex === 0) {
      moveToSlide(totalCards - 1);
    } else {
      moveToSlide(currentIndex - 1);
    }
  });
  updateCarousel();
});
