// This file contains general ui javascript for interactivity

const body = document.body;

const toggleFunc = (element, className) => {
  element.classList.toggle(className);
};

const dropdown = document.querySelectorAll("#dropdown");
const logoutBtn = document.querySelectorAll("#logout-btn");

dropdown.forEach((element) => {
  element.addEventListener("click", () => {
    logoutBtn.forEach((btn) => {
      toggleFunc(btn, "logout-btn-visible");
    });
  });
});

const dropdownMobile = document.querySelectorAll("#dropdown-mobile");

const logoutBtnMobile = document.querySelectorAll("#logout-btn-mobile");

dropdownMobile.forEach((element) => {
  element.addEventListener("click", () => {
    logoutBtnMobile.forEach((option) => {
      toggleFunc(option, "logout-btn-mobile-visible");
    });
  });
});

const mobileMenu = document.querySelectorAll(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links");

mobileMenu.forEach((menu) => {
  menu.addEventListener("click", () => {
    if (!menu.classList.contains("mobile-menu-open")) {
      logoutBtnMobile.forEach((element) => {
        if (element.classList.contains("logout-btn-mobile-visible")) {
          element.classList.remove("logout-btn-mobile-visible");
        }
      });
    }
    menu.classList.toggle("mobile-menu-open");
    mobileMenuLinks.forEach((link) => {
      toggleFunc(link, "mobile-menu-links-visible");
    });
    menu.classList.contains("mobile-menu-open")
      ? body.classList.add("no-scroll")
      : body.classList.remove("no-scroll");
  });
});

const saleElements = document.querySelectorAll(".sale");
// const showMore = document.querySelector(".show-more");

saleElements.forEach((sale) => {
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
const createProductContainer = document.getElementById(
  "create-product-container"
);

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
  deleteBtn.forEach((btn) => {
    openFunc(btn, deleteWindow);
    closeFunc(closeBtn, deleteWindow);
    closeFunc(cancelBtn, deleteWindow);
  });
}

const editBtn = document.querySelectorAll("#edit-btn");
const closeEditBtn = document.getElementById("close-edit-btn");
const editWindow = document.getElementById("edit-window");

if (editBtn) {
  editBtn.forEach((btn) => {
    openFunc(btn, editWindow);
    closeFunc(closeEditBtn, editWindow);
  });
}

const createRecord = document.getElementById("create-record");
const createRecordDiv = document.getElementById("create-record-div");
const closeSale = document.getElementById("close-sale");

if (createRecord) {
  openFunc(createRecord, createRecordDiv);
  closeFunc(closeSale, createRecordDiv);
}
