inView(".consultation__container").once("enter", function() {
  document.querySelector(".askform__content").classList.add("zoomIn");
  document.querySelector(".consultation__location-content").classList.add("fadeInRight");
});
inView(".wecreate").once("enter", function () {
    document.querySelector(".wecreate__item:nth-child(1)").classList.add("fadeInLeft");
    document.querySelector(".wecreate__item:nth-child(2)").style.opacity = "0";
    document.querySelector(".wecreate__right").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".wecreate__right").classList.add("fadeInRight");
      document.querySelector(".wecreate__right").style.opacity = "1";
    }, 1000)
    setTimeout(function () {
      document.querySelector(".wecreate__item:nth-child(2)").classList.add("fadeInUp");
      document.querySelector(".wecreate__item:nth-child(2)").style.opacity = "1";
    }, 2000)
});
inView(".ourservices__container").once("enter", function () {
  document.querySelector(".ourservices__left").classList.add("fadeInLeft");
  document.querySelector(".ourservices__item:nth-child(1)").classList.add("fadeInRight");
  document.querySelector(".ourservices__item:nth-child(2)").style.opacity = "0";
  document.querySelector(".ourservices__item:nth-child(3)").style.opacity = "0";
  setTimeout(function () {
    document.querySelector(".ourservices__item:nth-child(2)").classList.add("fadeInRight");
    document.querySelector(".ourservices__item:nth-child(2)").style.opacity = "1";
  }, 1000)
  setTimeout(function () {
    document.querySelector(".ourservices__item:nth-child(3)").classList.add("fadeInRight");
    document.querySelector(".ourservices__item:nth-child(3)").style.opacity = "1";
  }, 2000)
})
inView(".key__container").once("enter", function () {
  document.querySelector(".key__left").style.opacity = "0";
  document.querySelector(".key__right").style.opacity = "0";
  document.querySelector(".key__title").style.opacity = "0";
  document.querySelector(".key__variants").style.opacity = "0";
  document.querySelector(".key__title").classList.add("fadeInLeft");
  document.querySelector(".key__variants").classList.add("fadeInRight");
  document.querySelector(".key__title").style.opacity = "1";
  document.querySelector(".key__variants").style.opacity = "1";
  setTimeout(function () {
    document.querySelector(".key__left").classList.add("fadeInLeft");
    document.querySelector(".key__left").style.opacity = "1";
  }, 500);
  setTimeout(function () {
    document.querySelector(".key__right").classList.add("fadeInRight");
    document.querySelector(".key__right").style.opacity = "1";
  }, 1000);
})
inView(".advantages__content").once("enter", function() {
  document.querySelector(".advantages__info:nth-child(1)").classList.add("fadeInRight");
  setTimeout(() => {
    document.querySelector(".advantages__info:nth-child(2)").classList.add("fadeInRight");
  }, 300);
  setTimeout(() => {
    document.querySelector(".advantages__info:nth-child(3)").classList.add("fadeInRight");
  }, 500);
  setTimeout(() => {
    document.querySelector(".advantages__info:nth-child(4)").classList.add("fadeInRight");
  }, 800);
});
inView(".about__container").once("enter", function () {
  document.querySelector(".about__img").style.opacity = "0";
  document.querySelector(".about__content").classList.add("fadeInRight");
  setTimeout(function () {
    document.querySelector(".about__img").classList.add("fadeInLeft");
    document.querySelector(".about__img").style.opacity = "1";
  }, 1000);
})
inView(".learnus__container").once("enter", function () {
  document.querySelector(".learnus__left").classList.add("fadeInLeft");
  setTimeout(function () {
    document.querySelector(".learnus__right span:nth-child(1)").classList.add("fadeInRight");
  }, 500);
  setTimeout(function () {
    document.querySelector(".learnus__right span:nth-child(2)").classList.add("fadeInRight");
  }, 700);
  setTimeout(function () {
    document.querySelector(".learnus__right span:nth-child(3)").classList.add("fadeInRight");
  }, 900);
  setTimeout(function () {
    document.querySelector(".learnus__item:nth-child(1)").classList.add("learnUsHeight");
  }, 1200);
  setTimeout(function () {
    document.querySelector(".learnus__item:nth-child(2)").classList.add("fadeInUp");
  }, 1300);
  setTimeout(function () {
    document.querySelector(".learnus__item:nth-child(3").classList.add("fadeInUp");
  }, 1400);
  setTimeout(function () {
    document.querySelector(".learnus__item:nth-child(4)").classList.add("fadeInUp");
  }, 1500);
  setTimeout(function () {
    document.querySelector(".learnus__item:nth-child(5)").classList.add("fadeInUp");
  }, 1600);
})

inView(".whyus__container").once("enter", function() {
  document.querySelector(".whyus__right").classList.add("fadeInRight");
  document.querySelector(".whyus__about").style.opacity = "0";
  document.querySelector(".whyus__clients").style.opacity = "0";
  setTimeout(function () {
    document.querySelector(".whyus__about").classList.add("fadeInLeft");
  }, 500)
  setTimeout(function () {
    document.querySelector(".whyus__clients").classList.add("fadeInUp");
  }, 1000)

});

inView(".howworks__structure").once("enter", function() {
  document.querySelector(".howworks__item:nth-child(1)").classList.add("fadeInLeft");
  setTimeout(function() {
    document.querySelector(".howworks__item:nth-child(2)").classList.add("fadeInLeft");
  }, 500);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(3)").classList.add("fadeInLeft");
  }, 800);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(4)").classList.add("fadeInLeft");
  }, 1000);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(5)").classList.add("fadeInLeft");
  }, 1200);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(6)").classList.add("fadeInLeft");
  }, 1400);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(7)").classList.add("fadeInLeft");
  }, 1600);
  setTimeout(function () {
    document.querySelector(".howworks__item:nth-child(8)").classList.add("fadeInLeft");
  }, 1800);
});
inView(".askquestion__container").once("enter", function () {
  document.querySelector(".askquestion__right").classList.add("fadeInRight");
  setTimeout(() => {
    document.querySelector(".askquestion__left").classList.add("fadeInLeft");
  }, 500);
})
inView(".reviews .pic__carousel").once("enter", function() {
  document.querySelector(".reviews .pic__carousel").classList.add("fadeIn");
});
inView(".team .pic__carousel").once("enter", function () {
  document.querySelector(".team .pic__carousel").classList.add("fadeIn");
});