const track = document.querySelector(".carousel_track");
// console.log(track);
const slides = Array.from(track.children);
// console.log(slides);

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
// console.log(prevButton);
// console.log(nextButton);

const dotsNav = document.querySelector(".carousel_nav");
// console.log(dotsNav);
const dots = Array.from(dotsNav.children);
// console.log(dots);

let currIndex = 0;
let lastPrev = null;
let lastCurr = null;
let lastNext = null;

const displaySlides = (prevSlide, currSlide, nextSlide) => {
  if (lastPrev) {
    lastPrev.classList.remove("prev_slide", "current_slide", "next_slide");
  }
  if (lastCurr) {
    lastCurr.classList.remove("prev_slide", "current_slide", "next_slide");
  }
  if (lastNext) {
    lastNext.classList.remove("prev_slide", "current_slide", "next_slide");
  }

  prevSlide.classList.add("prev_slide");
  currSlide.classList.add("current_slide");
  nextSlide.classList.add("next_slide");

  lastPrev = prevSlide;
  lastCurr = currSlide;
  lastNext = nextSlide;
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current_slide");
  targetDot.classList.add("current_slide");
};
nextButton.addEventListener("click", (e) => {
  currIndex = currIndex + 1 >= slides.length ? 0 : currIndex + 1;
  let prevIndex = currIndex > 0 ? currIndex - 1 : slides.length - 1;
  let nextIndex = currIndex < slides.length - 1 ? currIndex + 1 : 0;
  const currentDot = dotsNav.querySelector(".current_slide");
  let nextDot = dots[currIndex];

  displaySlides(slides[prevIndex], slides[currIndex], slides[nextIndex]);
  updateDots(currentDot, nextDot);
});

prevButton.addEventListener("click", (e) => {
  currIndex = currIndex - 1 >= 0 ? currIndex - 1 : slides.length - 1;
  let prevIndex = currIndex > 0 ? currIndex - 1 : slides.length - 1;
  let nextIndex = currIndex < slides.length - 1 ? currIndex + 1 : 0;
  const currentDot = dotsNav.querySelector(".current_slide");
  let prevDot = dots[currIndex];

  displaySlides(slides[prevIndex], slides[currIndex], slides[nextIndex]);
  updateDots(currentDot, prevDot);
});

dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button"); // only returns a non null value if it clicks on a button element
  // console.log(e.target);

  if (!targetDot) return;
  const currentDot = dotsNav.querySelector(".current_slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);

  currIndex = targetIndex;
  const prevIndex = currIndex > 0 ? currIndex - 1 : slides.length - 1;
  const nextIndex = currIndex < slides.length - 1 ? currIndex + 1 : 0;

  displaySlides(slides[prevIndex], slides[currIndex], slides[nextIndex]);
  updateDots(currentDot, targetDot);
});

displaySlides(slides[slides.length - 1], slides[0], slides[1]);
