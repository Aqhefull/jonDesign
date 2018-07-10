let i = 0;
const images = [];
let time = 3333;
const slider = document.querySelector(".slider__bg");
images[0] = "./img/slider/1.jpeg";
images[1] = "./img/slider/2.jpeg";
images[2] = "./img/slider/3.jpeg";
images[3] = "./img/slider/4.jpeg";
images[4] = "./img/slider/5.jpeg";

function changeImg() {
  if (slider === null) return
  slider.style.backgroundImage = `url(${images[i]})`;
  slider.style.animation = "animationTop 20s linear infinite alternate";
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout(changeImg, time);
}
changeImg();