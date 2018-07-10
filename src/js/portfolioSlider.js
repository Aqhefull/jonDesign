const portfolioMenuFirstItem = document.querySelector(".portfolio-menu__item");
const portfolioMenuItems = Array.from(document.querySelectorAll(".portfolio-menu__item"));
const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));

if (portfolioMenuFirstItem != null) {
  portfolioMenuFirstItem.classList.add("active");

  portfolioMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", function () {
      portfolioMenuItems.forEach(menuItem => {
        menuItem.classList.remove("active");
      })
      menuItem.classList.add('active');
      const menuItemCat = menuItem.dataset.category;
      portfolioItems.forEach(portItem => {
        portItem.style.display = "none";
        if (portItem.dataset.category.indexOf(menuItemCat) != -1) {
          portItem.style.display = "block";
          portItem.classList.remove("opacityFull");
          void portItem.offsetWidth;
          portItem.classList.add("opacityFull");
        }
      });
    });
  });
}
