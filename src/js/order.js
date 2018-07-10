import { getBase } from './common'


const orderLeft = document.querySelector(".order__left");
const orderRight = document.querySelector(".order__right");
const orderRightServices = document.querySelector(".order__services");
const addServiceBtn = document.getElementById("addServiceBtn");

const orderName = document.getElementById("orderName");
const orderPhone = document.getElementById("orderPhone");
const orderEmail = document.getElementById("orderEmail");
const orderPrice = document.getElementById("orderPrice");
const orderComment = document.getElementById("orderComment");


//Message Form --->
function formMessage(message, type, parent){
  const container = document.createElement('div');
  container.className = type;
  container.innerHTML = `<span>${message}</span>`;
  parent.appendChild(container);
  function removeContainer() {
    return container.remove()
  }
  setTimeout(removeContainer, 3000);
}
// <---Message Form


// orderPrice ---------
if (orderPrice != null) {
  orderPrice.addEventListener("change", function () {
    if (orderPrice.value === "6") {
      const yourPrice = document.createElement('input')
      yourPrice.id = "orderYourPrice";
      yourPrice.setAttribute("type", "text");
      yourPrice.setAttribute("placeholder", "Введите вашу цену ($)");
      yourPrice.style.minWidth = '150px'
      yourPrice.style.width = "auto";
      orderLeft.insertBefore(yourPrice, orderComment);
    }
  });
}


//-------------------------

function generateServicesNumber() {
  let dataServicesNumber = 1;
  return function () {
    return dataServicesNumber++;
  }
}
const generateNumSer = generateServicesNumber();
if (addServiceBtn != null) {
  addServiceBtn.addEventListener("click", function() {
    console.log("orderRight.offsetHeight", orderRight.offsetHeight);
    console.log("orderLeft.offsetHeight", orderLeft.offsetHeight);
    if (orderRight.offsetHeight > orderLeft.offsetHeight) {
      orderRightServices.style.maxHeight = orderLeft.offsetHeight - 20 - addServiceBtn.offsetHeight + 'px';
      orderRightServices.style.overflowY = "scroll";
      orderRightServices.style.paddingRight = 10 + 'px';
    }
    //OrderServices
    const orderServices = document.createElement("div");
    orderServices.className = "orderServices";
    orderServices.dataset.id = generateNumSer();
    orderRightServices.appendChild(orderServices);

    const orderServicesTitle = document.createElement("span");
    orderServicesTitle.innerHTML = `Услуга ${orderServices.dataset.id}`;
    orderServicesTitle.classList.add("orderServices-title");
    orderServices.appendChild(orderServicesTitle);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("mdi", "mdi-window-close", "orderServices-close");
    orderServices.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function() {
      orderServices.remove();
      if (orderRight.offsetHeight < orderLeft.offsetHeight) {
        orderRightServices.style.maxHeight = ''
        orderRightServices.style.overflowY = 'initial'
        orderRightServices.style.paddingRight = 18 + "px";
      }
    });

    const formGroup = document.createElement("div");
    formGroup.className = "formGroup";
    orderServices.appendChild(formGroup);

    const orderServicesLabel = document.createElement("label");
    orderServicesLabel.innerHTML = "Категория услуги";
    formGroup.appendChild(orderServicesLabel);

    const selectfield = document.createElement("div");
    selectfield.className = "selectfield";
    formGroup.appendChild(selectfield);

    const orderCategory = document.createElement("select");
    orderCategory.setAttribute("required", "required");
    orderCategory.className = "orderCategory";
    orderCategory.dataset.id = orderServices.dataset.id;
    selectfield.appendChild(orderCategory);

    const selectOrderFirstOption = document.createElement("option");
    selectOrderFirstOption.value = "";
    selectOrderFirstOption.setAttribute("disabled", "disabled");
    selectOrderFirstOption.setAttribute("selected", "selected");
    selectOrderFirstOption.innerHTML = "Выберите категорию";
    orderCategory.appendChild(selectOrderFirstOption);

    //Order Service Render---

    function renderOrderService(catName, subcat) {
      let output = "";
      output = `<optgroup label="${catName}">`;
      subcat.forEach(item => {
        output += `<option value="${item.value}">${item.title}</option> `;
      });
      output += `</outgroup>`;
      orderCategory.insertAdjacentHTML("beforeend", output);
    }

    getBase().then(result => {
      result.categories.forEach(category => {
        renderOrderService(category.title, category.subcat);
      });
    });

    //-------------------------
    orderCategory.addEventListener("change", function() {
      const orderServiceExist = orderServices.querySelector(".orderService");
      if (
        orderServiceExist != null &&
        orderServiceExist.parentElement.parentElement.classList.contains(
          "formGroup"
        )
      ) {
        orderServiceExist.parentElement.parentElement.remove();
      }
      const formGroup = document.createElement("div");
      formGroup.classList.add("formGroup");

      const selectfield = document.createElement("div");
      selectfield.classList.add("selectfield");

      const orderServicesLabel = document.createElement("label");
      orderServicesLabel.innerText = "Выбранная услуга";
      formGroup.appendChild(orderServicesLabel);

      const orderService = document.createElement("select");
      orderService.className = "orderService";
      orderService.setAttribute("required", "required");
      orderService.dataset.id = orderServices.dataset.id;

      selectfield.appendChild(orderService);

      getBase().then(result => {
        result.items.forEach(item => {
          if (orderCategory.value === item.subcat) {
            const orderServiceItem = document.createElement("option");
            orderServiceItem.value = item.title;
            orderServiceItem.innerHTML = `${item.title} (от ${item.price}$)`;
            orderService.appendChild(orderServiceItem);
          }
        });
        formGroup.appendChild(selectfield);
        orderServices.appendChild(formGroup);
      });
    });
  });
}



// ------------ Send Values ------------

const orderSendBtn = document.getElementById("orderSendBtn");
const formData = {}
if (orderSendBtn != null) {
  orderSendBtn.addEventListener('click', function(e) {
    e.preventDefault()
    const orderCategories = Array.from(document.querySelectorAll(".orderCategory"));
    const orderServices = Array.from(document.querySelectorAll(".orderService"));
    const orderServicesContainer = Array.from(document.querySelectorAll(".orderServices"));
    let isServiceExist = false;
    // ---------- Error handler ------------

    if (orderName.value === "") {
      formMessage("Укажите ФИО", "error", orderName.parentElement)
      return
    }
    if (orderPhone.value === "") {
      formMessage("Укажите Телефон", "error", orderPhone.parentElement);
      return;
    }
    if (orderEmail.value === "") {
      formMessage("Укажите Email", "error", orderEmail.parentElement);
      return;
    }
    if (orderPrice.value === "") {
      formMessage("Укажите Бюджет", "error", orderPrice.parentElement);
      return;
    }
    if (orderServicesContainer.length === 0) {
      isServiceExist = false
    } else {
      isServiceExist = true
    }

    if (isServiceExist === false) {
      formMessage("Укажите хотя бы 1 услугу", "error", orderRightServices);
      return
    }

    formData.orderName = orderName.value;
    formData.orderPhone = orderPhone.value;
    formData.orderEmail = orderEmail.value;
    formData.orderPrice = orderPrice.value;
    formData.orderComment = orderComment.value;
    formData.orderCategories = [];
    getBase().then(result => {
      let catExist = true;
          for (let index = 0; index < orderCategories.length; index++) {
            const cat = orderCategories[index];
            if (cat.value === '') {
              formMessage("Выберите категорию", "error", cat.parentElement.parentElement);
              catExist = false;
              break
            }
            result.categories.forEach(item => {
              item.subcat.forEach(subcat => {
                if (subcat.value === cat.value) {
                  formData.orderCategories.push(subcat.title);
                }
              });
            });
          }
      if (catExist === false) return
      formData.orderServices = [];
      orderServices.forEach(service => {
        formData.orderServices.push(service.value);
      });
      console.log(formData);
      initOrderPopup(formData);
    });
    function initOrderPopup(data) {
      const orderPopup = document.createElement('div')
      orderPopup.className = "orderPopup";
      document.body.appendChild(orderPopup);

      const orderPopupContainer = document.createElement('div')
      orderPopupContainer.className = "orderPopup__container";
      orderPopup.appendChild(orderPopupContainer);

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("mdi", "mdi-window-close", "orderPopup-close");
      orderPopupContainer.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        orderPopup.remove();
      });

      let orderPopupContent = "";
      orderPopupContent = `
        <div class="orderPopup__content">
          <h3 style="color: green">Ваш заказ принят!</h3>
          <h6>Ваш заказ</h6>
          <div>
            <label>ФИО:</label>
            <span>${data.orderName}</span>
          </div>
          <div>
            <label>Телефон:</label>
            <span>${data.orderPhone}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>${data.orderEmail}</span>
          </div>
          <div>
            <label>Бюджет:</label>
            <span>${data.orderPrice}$</span>
          </div>
          <div>
            <label>Комментарий:</label>
            <span>${data.orderComment}</span>
          </div>
          <div>
            <label>Услуги:</label>
            <ul>
      `;
      for (let index = 0; index < data.orderCategories.length; index++) {
        const cat = data.orderCategories[index];
        const service = data.orderServices[index];
        orderPopupContent += `
              <li>${cat} -> ${service}</li>
          `;
      }
      orderPopupContent += `
          </ul>
          </div>
        </div>
      `;
      orderPopupContainer.insertAdjacentHTML("beforeend", orderPopupContent);
    }
  })
}





