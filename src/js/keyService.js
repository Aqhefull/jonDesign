import {xhrGet} from './common'

const keyVariants = Array.from(document.querySelectorAll(".key__variants > a"));
let keyItemHeaderTitle = document.querySelector(".key__item-header h3");
let keyItemHeaderPrice = document.querySelector(".key__item-header span");
let keyItemInfo = document.querySelector(".key__item-info");
let keyItemPrice = document.querySelector(".key__item-price span");
let keyRightImg = document.querySelector(".key__right img");

keyVariants.forEach(keyService => {
  keyService.addEventListener("click", function(e) {
    e.preventDefault();
    keyVariants.forEach(element => {
      if (element.classList.contains("active")) element.classList.remove("active");
    });
    xhrGet("./base.json", function() {
      const keyServices = JSON.parse(this.responseText);
      keyServices.keyServices.forEach(service => {
        if (keyService.dataset.id == service.id) {
          keyService.classList.add("active");
          keyItemHeaderTitle.classList.add("fadeInLeft");
          keyItemHeaderPrice.classList.add("fadeInLeft");
          keyItemPrice.classList.add("fadeInRight");
          keyRightImg.classList.add("fadeInRight");

          setTimeout(function() {
            keyItemHeaderTitle.classList.remove("fadeInLeft");
            keyItemHeaderPrice.classList.remove("fadeInLeft");
            keyItemPrice.classList.remove("fadeInRight");
            keyRightImg.classList.remove("fadeInRight");
          }, 1500);

          keyItemHeaderTitle.innerHTML = service.title;
          keyItemHeaderPrice.innerHTML = service.price;
          keyItemPrice.innerHTML = service.price;
          keyRightImg.src = service.img;
        }
      });
    });
  });
});