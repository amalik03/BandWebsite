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

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currSlide.classList.remove("current_slide");
  targetSlide.classList.add("current_slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current_slide");
  targetDot.classList.add("current_slide");
};

// const updateArrows = (slides, prev, next, targetIndex) => {
//   if (targetIndex === 0) {
//     prev.classList.add("is_hidden");
//     next.classList.remove("is_hidden");
//   } else if (targetIndex === slides.length - 1) {
//     prev.classList.remove("is_hidden");
//     next.classList.add("is_hidden");
//   } else {
//     prev.classList.remove("is_hidden");
//     next.classList.remove("is_hidden");
//   }
// };

// click right, move slides right
nextButton.addEventListener("click", (e) => {
  const currSlide = track.querySelector(".current_slide");
  const currentDot = dotsNav.querySelector(".current_slide");
  let nextSlide = currSlide.nextElementSibling;
  let nextDot = currentDot.nextElementSibling;
  let nextIndex = slides.findIndex((i) => i == nextSlide);

  let prevSlide = currSlide.previousElementSibling;
  let prevDot = currentDot.previousElementSibling;
  let prevIndex = slides.findIndex((i) => i == prevSlide);

  if (nextIndex < 0) {
    nextIndex = 0;
    nextSlide = slides[0];
    nextDot = dots[0];
  }
  if (prevIndex < 0) {
    prevIndex = slides.length - 1;
    prevSlide = slides[prevIndex];
    prevDot = dots[prevIndex];
  }

  moveToSlide(track, currSlide, nextSlide);
  updateDots(currentDot, nextDot);
  // updateArrows(slides, prevButton, nextButton, nextIndex);
});

// click left, move slides left
prevButton.addEventListener("click", (e) => {
  const currSlide = track.querySelector(".current_slide");
  const currentDot = dotsNav.querySelector(".current_slide");
  let prevSlide = currSlide.previousElementSibling;
  let prevDot = currentDot.previousElementSibling;
  let prevIndex = slides.findIndex((i) => i == prevSlide);

  if (prevIndex < 0) {
    prevIndex = slides.length - 1;
    prevSlide = slides[prevIndex];
    prevDot = dots[prevIndex];
  }

  moveToSlide(track, currSlide, prevSlide);
  updateDots(currentDot, prevDot);
  // updateArrows(slides, prevButton, nextButton, prevIndex);
});

dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button"); // only returns a non null value if it clicks on a button element
  // console.log(e.target);

  if (!targetDot) return;
  const currSlide = track.querySelector(".current_slide");
  const currentDot = dotsNav.querySelector(".current_slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  // console.log(targetIndex);

  const targetSlide = slides[targetIndex];

  moveToSlide(track, currSlide, targetSlide);
  updateDots(currentDot, targetDot);
  // updateArrows(slides, prevButton, nextButton, targetIndex);
});
