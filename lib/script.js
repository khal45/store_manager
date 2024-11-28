"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
const body = document.body;
const toggleFunc = (element, className) => {
  element.classList.toggle(className);
};
const dropdown = document.querySelectorAll("#dropdown");
const userOptions = document.querySelectorAll("#user-options");
dropdown.forEach(element => {
  element.addEventListener("click", () => {
    userOptions.forEach(option => {
      toggleFunc(option, "user-options-visible");
    });
  });
});
const dropdownMobile = document.querySelectorAll("#dropdown-mobile");
const userOptionsMobile = document.querySelectorAll("#user-options-mobile");
dropdownMobile.forEach(element => {
  element.addEventListener("click", () => {
    userOptionsMobile.forEach(option => {
      toggleFunc(option, "user-options-mobile-visible");
    });
  });
});
const mobileMenu = document.querySelectorAll(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links");
mobileMenu.forEach(menu => {
  menu.addEventListener("click", () => {
    if (!menu.classList.contains("mobile-menu-open")) {
      userOptionsMobile.forEach(element => {
        if (element.classList.contains("user-options-mobile-visible")) {
          element.classList.remove("user-options-mobile-visible");
        }
      });
    }
    menu.classList.toggle("mobile-menu-open");
    mobileMenuLinks.forEach(link => {
      toggleFunc(link, "mobile-menu-links-visible");
    });
    menu.classList.contains("mobile-menu-open") ? body.classList.add("no-scroll") : body.classList.remove("no-scroll");
  });
});
const saleElements = document.querySelectorAll(".sale");
const showMore = document.querySelector(".show-more");
saleElements.forEach(sale => {
  sale.addEventListener("click", () => {
    let div2 = sale.children[1];
    let firstDiv3 = div2.children[0];
    let items = firstDiv3.children[0];
    let showMore = items.children[2];
    toggleFunc(div2, "expanded");
    toggleFunc(showMore, "h3-collapsed");
  });
});
const addUser = document.getElementById("add-user");
const createAttendant = document.querySelector(".create-attendant");
if (addUser) {
  addUser.addEventListener("click", () => {
    toggleFunc(createAttendant, "create-attendant-visible");
  });
}
const openFunc = (btn, element) => {
  btn.addEventListener("click", () => {
    element.classList.add("open-container");
  });
};
const closeFunc = (btn, element) => {
  btn.addEventListener("click", () => {
    element.classList.remove("open-container");
  });
};
const addBtn = document.getElementById("add-btn");
const addProduct = document.getElementById("add-product");
const closeWindow = document.getElementById("close-window");
const createProductContainer = document.getElementById("create-product-container");
if (addBtn) {
  openFunc(addBtn, createProductContainer);
  openFunc(addProduct, createProductContainer);
  closeFunc(closeWindow, createProductContainer);
}
const deleteBtn = document.querySelectorAll("#delete-btn");
const closeBtn = document.getElementById("close-btn");
const deleteWindow = document.getElementById("delete-window");
const cancelBtn = document.getElementById("cancel-btn");
if (deleteBtn) {
  deleteBtn.forEach(btn => {
    openFunc(btn, deleteWindow);
    closeFunc(closeBtn, deleteWindow);
    closeFunc(cancelBtn, deleteWindow);
  });
}
const editBtn = document.querySelectorAll("#edit-btn");
const closeEditBtn = document.getElementById("close-edit-btn");
const editWindow = document.getElementById("edit-window");
if (editBtn) {
  editBtn.forEach(btn => {
    openFunc(btn, editWindow);
    closeFunc(closeEditBtn, editWindow);
  });
}