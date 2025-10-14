// === Cool Stuff Carousel ===
const track = document.querySelector('.cool-carousel-track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 1; // Start at 1 because of the prepended clone

// Clone first and last items for seamless looping
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.insertBefore(lastClone, items[0]);
track.appendChild(firstClone);

const allItems = Array.from(track.children);

function updateCarousel(animate = true) {
  const width = track.clientWidth;
  track.style.transition = animate ? 'transform 0.5s cubic-bezier(.77,0,.18,1)' : 'none';
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  allItems.forEach(item => {
    item.classList.remove('active', 'left', 'right');
  });
  if (allItems[currentIndex]) allItems[currentIndex].classList.add('active');
  if (allItems[currentIndex - 1]) allItems[currentIndex - 1].classList.add('left');
  if (allItems[currentIndex + 1]) allItems[currentIndex + 1].classList.add('right');

  tryInitMap();
}

// Handle transition end for seamless looping
track.addEventListener('transitionend', () => {
  const width = track.clientWidth;
  if (currentIndex === 0) {
    currentIndex = items.length;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }
  if (currentIndex === items.length + 1) {
    currentIndex = 1;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }
  tryInitMap();
});

function goToPrev() {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateCarousel();
  resetCarouselInterval();
}

function goToNext() {
  if (currentIndex >= allItems.length - 1) return;
  currentIndex++;
  updateCarousel();
  resetCarouselInterval();
}

// Auto-rotate every 5 seconds
const carouselSpeed = 5000;
let carouselInterval = setInterval(goToNext, carouselSpeed);

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(goToNext, carouselSpeed);
}

// === 🧠 Pause on hover ===
track.addEventListener('mouseenter', () => {
  clearInterval(carouselInterval);
});

track.addEventListener('mouseleave', () => {
  resetCarouselInterval();
});

// Button controls
prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);

// Handle window resize
window.addEventListener('resize', () => updateCarousel(false));

// Initialize carousel position
window.addEventListener('DOMContentLoaded', () => {
  updateCarousel(false);
  setTimeout(() => {
    tryInitMap();
  }, 10);
});
