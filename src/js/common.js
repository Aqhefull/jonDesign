import { parse } from "path";

/*Ajax GET*/
function xhrGet(url, xhrBody) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      xhrBody.call(this);
    }
  };
  xhr.send();
}

function getBase() {
  return new Promise(function (resolve, reject) {
    xhrGet("./base.json", function () {
      const base = JSON.parse(this.responseText);
      resolve(base);
    });
  });
}

window.addEventListener("load", function (event) {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("opacityNull");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 500);
});
  
// Mobile hamburger
const navMobileIcon = document.querySelector(".header__mobile-icon");

if (navMobileIcon != null) {
  navMobileIcon.querySelector(".mdi-reorder-horizontal").addEventListener('click', function() {
    const navigation = document.querySelector(".navigation");
    navigation.classList.toggle("navigation__open");
  })
}


/*tab */
const acc = Array.from(document.getElementsByClassName("askquestion__accordion"));

acc.forEach(element => {
  element.addEventListener("click", function () {
    acc.forEach(element => {
      element.classList.remove("active");
      const panel = element.nextElementSibling;
      panel.style.maxHeight = null;
    });
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
});

/*Horizontal Carousel Start*/
const horCarousel = function (imgUl, idCarousel, imgCount) {
  const lis = document.querySelectorAll(`${imgUl} li`);
  for (let i = 0; i < lis.length; i++) {
    lis[i].style.position = "relative";
  }

  /* Config */
  //width of carousel
  const width = parseInt(getComputedStyle(document.querySelector(idCarousel)).width);
  const mq = window.matchMedia("(max-width: 480px)");
  let count;
  if (mq.matches) {
    count = 1;
  } else {
    count = imgCount;
  }
   // number of images
  const carousel = document.querySelector(idCarousel);
  const list = carousel.querySelector("ul");
  const listElems = carousel.querySelectorAll("li");
  listElems.forEach(element => {
    element.style.width = width / count + "px";
  });
  let position = 0; // current left position

  carousel.querySelector(".mdi-arrow-left-thick").onclick = function() {
    // to left init
    position = Math.min(position + width / count, 0);
    list.style.marginLeft = position + "px";
  };

  carousel.querySelector(".mdi-arrow-right-thick").onclick = function() {
    // to right init
    let a = position - width / count;
    let b = -(listElems.length * (width / count)) + (width);
    position = Math.max(a, b);
    list.style.marginLeft = position + "px";
  };
};

if (document.querySelector('.pic__carousel') != null) {
  setTimeout(function () {
    horCarousel("#reviewsCarousel .pic__images", "#reviewsCarousel", 1);
    horCarousel("#teamCarousel .pic__images", "#teamCarousel", 3);
  }, 1000)
  window.addEventListener('resize', function() {
    horCarousel("#reviewsCarousel .pic__images", "#reviewsCarousel", 1);
    horCarousel("#teamCarousel .pic__images", "#teamCarousel", 3);
  })
}
/*Horizontal Carousel End*/
/*Verical Carousel Start*/

const verCarousel = function () {
  const carousel = document.getElementById('weCreateList');
  carousel.style.top = '0px'
  const carouselItems = Array.from(carousel.querySelectorAll(".wecreate__list-item"));
  const imgWeCreate = document.querySelector('.wecreate__right img');
  for (let index = 0; index < carouselItems.length; index++) {
    const element = carouselItems[index];
    element.addEventListener("click", function () {
      imgWeCreate.classList.remove("fadeIn");
      imgWeCreate.setAttribute("src", `/img/verticalCarousel/${index + 1}.jpg`);
      void imgWeCreate.offsetWidth;
      imgWeCreate.classList.add("fadeIn");
      carouselItems.forEach(element => {
        element.classList.remove("active");
      });
      element.classList.add('active');
      const elementMarginHeight = parseInt(getComputedStyle(element).marginTop);
      carousel.style.top = -((element.offsetHeight + elementMarginHeight) * index) + "px";
    });
  }
}
if (document.querySelector(".wecreate__list") != null) {
  setTimeout(function() {
    verCarousel();
  }, 1000);
}
/*Verical Carousel End*/




export { xhrGet, getBase};
