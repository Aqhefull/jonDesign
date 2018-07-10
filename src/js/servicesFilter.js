import {getBase} from './common'
//---------------------------------
const servicesSection = document.querySelector(".services");
const services = document.querySelector(".services-content__items");
const servicesCount = document.querySelector(".services-filter-actions__count span");
const serviceSidebarCat = Array.from(document.querySelectorAll("#servicesCategory .services-sidebar__categories li"));
const serviceSidebarSubCatContainer = document.querySelector("#servicesSubCategory");
const serviceSidebarSubCat = document.querySelector("#servicesSubCategory .services-sidebar__categories");

const serviceItems = () => Array.from(document.querySelectorAll(".services-content-item"));
if (servicesSection != null) {
  //---------------------------------


  function renderBaseServices() {
    getBase().then(result => {
      result.items.map((service, index) => renderServices(service, index));
      servicesCount.innerHTML = serviceItems().length;
      initPagination(serviceItems().length);
    });
  }
  renderBaseServices();

  function initPagination(result) {
    initTopSort();
    const count = result; //total items
    const itemsPerPage = 10; //items per page
    const pagesNum = Math.ceil(count / itemsPerPage); //number of pages

    //init list of pages
    const paginator = document.querySelector(".paginator");
    let page = "";
    for (let i = 0; i < pagesNum; i++) {
      page +=
        "<span data-page=" +
        i * itemsPerPage +
        '  id="page' +
        (i + 1) +
        '">' +
        (i + 1) +
        "</span>";
    }
    paginator.innerHTML = page;

    //init first items {itemsPerPage}
    const div_num = document.querySelectorAll(".num");
    for (let i = 0; i < div_num.length; i++) {
      if (i < itemsPerPage) {
        div_num[i].style.display = "flex";
      }
    }

    let main_page = document.getElementById("page1");
    if (main_page != null) main_page.classList.add("paginator_active");

    //листаем
    paginator.addEventListener("click", function(event) {
      let e = event || window.event;
      const target = e.target;
      const id = target.id;

      if (target.tagName.toLowerCase() != "span") return;

      const num_ = id.substr(4);
      const data_page = +target.dataset.page;
      main_page.classList.remove("paginator_active");
      main_page = document.getElementById(id);
      main_page.classList.add("paginator_active");

      let j = 0;
      for (let i = 0; i < div_num.length; i++) {
        let data_num = div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page)
          div_num[i].style.display = "none";
      }
      for (let i = data_page; i < div_num.length; i++) {
        if (j >= itemsPerPage) break;
        div_num[i].style.display = "flex";
        j++;
      }
    });
  }

  //---------------------------------
  // RENDER SERVICES //
  //---------------------------------

  function renderServices(service, index) {
    //JSON Input
    let output = "";
    output = `
          <div class="services-content-item num" data-num=${index}>
            <div class="services-content-item__img">
             <img src="${service.src}">
            </div>
            <div class="services-content-item__content">
              <div class="services-content-item__info">
                <div class="services-content-item__title">
                  <span>${service.title}</span>
                </div>
                <div class="services-content-item__category">
                  <span>Категория: </span> ${service.subcat_name}
                </div>
                <div class="services-content-item__price">
                  <span>от <strong>${service.price}</strong>$</span>
                </div>
                <div class="services-content-item__description">
                  ${service.description}
                </div>
              </div>
            </div>
          </div>
      `;
    services.insertAdjacentHTML("beforeend", output);
  }

  //---------------------------------
  // RENDER SUB CATEGORIES //
  //---------------------------------

  function renderSubCat(subcat) {
    if (!services) return;
    let output = "";
    output = `
      <li data-name="${subcat.value}">
        <label class="services-sidebar__cat">
          <div class="checker">
            <span>
              <input type="checkbox" value="${subcat.value}">
            </span>
          </div>
          <span>${subcat.title}</span>
        </label>
      </li>
    `;
    serviceSidebarSubCat.insertAdjacentHTML("beforeend", output);
  }

  //---------------------------------
  // FILTER MAIN ACTION
  //---------------------------------
  if (serviceSidebarCat != null) {
    const catToShow = [];
    let subcat = [];
    function initSubCat() {
      //+-----Render subcat in HTML
      catToShow.forEach(object => {
        object.subcat.forEach(subcat => {
          renderSubCat(subcat);
        });
      });
      //+-----Init functional to SubCategory
      loadSubCat();
    }
    serviceSidebarCat.forEach(category => {
      category.addEventListener("click", function(e) {
        const catCheckbox = category.querySelector("span");
        //EVENT DELEGATION
        if (e.target === category.querySelector("input")) {
          if (!catCheckbox.classList.contains("checked")) {
            // IF NOT CHECKED..
            catCheckbox.classList.toggle("checked");
            subcat = [];
            getBase().then(result => {
              //Clear services
              services.innerHTML = "";
              result.categories.forEach(currentCat => {
                //If cat name in html === cat name in base, push to arr
                if (category.dataset.name === currentCat.value) {
                  catToShow.push({
                    value: currentCat.value,
                    title: currentCat.title,
                    subcat: currentCat.subcat
                  });
                  result.items.map((item, index) => {
                    catToShow.forEach(cat => {
                      if (item.category === cat.value) {
                        renderServices(item, index);
                      }
                    });
                  });
                }
              });
              servicesCount.innerHTML = serviceItems().length;
              initPagination(serviceItems().length);

              serviceSidebarSubCatContainer.style.display = "block";
              serviceSidebarSubCat.innerHTML = "";
              initSubCat();
            });
          } else {
            // IF CHECKED..
            catCheckbox.classList.toggle("checked");
            subcat = [];

            //+----Search and delete Category in array
            catToShow.map((object, index) => {
              if (object.value.indexOf(category.dataset.name) > -1) {
                catToShow.splice(index, 1);
              }
            });

            services.innerHTML = "";

            getBase().then(result => {
              result.items.map((item, index) => {
                catToShow.forEach(cat => {
                  if (item.category === cat.value) {
                    renderServices(item, index);
                  }
                });
              });
              servicesCount.innerHTML = serviceItems().length;
              initPagination(serviceItems().length);
            });

            serviceSidebarSubCat.innerHTML = "";
            serviceSidebarSubCatContainer.style.display = "block";

            //IF ANYONE IS NOT CHECKED -> GET MAIN BASE
            if (catToShow.length === 0) {
              services.innerHTML = "";
              renderBaseServices();
              serviceSidebarSubCatContainer.style.display = "none";
            }

            initSubCat();
          }
        }
      });
    });
    function compareArrLogic() {
      // ATTENTION: For Subcat only!
      // Compare arrays. If condition is true -> renderServices
      getBase().then(result => {
        catToShow.forEach(object => {
          object.subcat.forEach(catSubcat => {
            subcat.forEach(sub => {
              if (catSubcat.value === sub) {
                result.items.map((item, index) => {
                  if (
                    item.category === object.value &&
                    item.subcat === catSubcat.value
                  ) {
                    renderServices(item, index);
                  }
                });
              }
            });
          });
        });
        servicesCount.innerHTML = serviceItems().length;
        initPagination(serviceItems().length);
      });
    }
    function loadSubCat() {
      const subCategories = Array.from(
        document.querySelectorAll(
          "#servicesSubCategory .services-sidebar__categories li"
        )
      );
      subCategories.forEach(subCategory => {
        subCategory.addEventListener("click", function(e) {
          const catCheckbox = subCategory.querySelector("span");
          //EVENT DELEGATION
          if (e.target === subCategory.querySelector("input")) {
            if (!catCheckbox.classList.contains("checked")) {
              // IF NOT CHECKED..
              catCheckbox.classList.toggle("checked");
              //Push to subcat[]
              if (subcat.indexOf(subCategory.dataset.name) === -1) {
                subcat.push(subCategory.dataset.name);
              }
              services.innerHTML = "";
              //Compare arrays. If condition is true -> renderServices
              compareArrLogic();
            } else {
              // IF CHECKED..
              catCheckbox.classList.toggle("checked");
              //If subcat exist in subcat[] -> delete
              if (subcat.indexOf(subCategory.dataset.name) > -1) {
                subcat.splice(subcat.indexOf(subCategory.dataset.name), 1);
              }
              services.innerHTML = "";
              getBase().then(result => {
                if (subcat.length === 0) {
                  //If Subcat is 0 (not anyone is checked)
                  getBase().then(result => {
                    result.items.map((item, index) => {
                      catToShow.forEach(cat => {
                        if (item.category === cat.value) {
                          renderServices(item, index);
                        }
                      });
                    });
                    servicesCount.innerHTML = serviceItems().length;
                    initPagination(serviceItems().length);
                  });
                } else {
                  //If Subcat not Empty (anyone is checked)
                  compareArrLogic();
                }
              });
            }
          }
        });
      });
    }
  }
  //---------------------

  function sortAlphabet() {
    const serviceItem = Array.from(
      document.querySelectorAll(".services-content-item")
    );
    function compareItemsAlphabet(a, b) {
      if (
        a.querySelector(".services-content-item__title span").textContent <
        b.querySelector(".services-content-item__title span").textContent
      ) {
        return -1;
      } else {
        return 1;
      }
    }
    serviceItem.sort(compareItemsAlphabet);
    const fragment = document.createDocumentFragment();
    serviceItem.forEach(element => {
      fragment.appendChild(element);
    });
    services.appendChild(fragment);
  }
  function sortPrice(sort) {
    const serviceItem = Array.from(
      document.querySelectorAll(".services-content-item")
    );
    function compareItemsPrice(a, b) {
      if (sort === "up") {
        return (
          a.querySelector(".services-content-item__price > span > strong")
            .textContent -
          b.querySelector(".services-content-item__price > span > strong")
            .textContent
        );
      }
      if (sort === "down") {
        return (
          b.querySelector(".services-content-item__price > span > strong")
            .textContent -
          a.querySelector(".services-content-item__price > span > strong")
            .textContent
        );
      }
    }
    serviceItem.sort(compareItemsPrice);
    const fragment = document.createDocumentFragment();
    serviceItem.forEach(element => {
      fragment.appendChild(element);
    });
    services.appendChild(fragment);
  }
  //Sort Top
  function initTopSort() {
    if (sortSelectTop.value === "1") {
      sortAlphabet();
    }
    if (sortSelectTop.value === "2") {
      sortPrice("up");
    }
    if (sortSelectTop.value === "3") {
      sortPrice("down");
    }
  }

  const sortSelectTop = document.querySelector("#slct");
  if (sortSelectTop != null) {
    sortSelectTop.addEventListener("change", initTopSort);
  }
}

