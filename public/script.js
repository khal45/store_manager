const dropdown = document.getElementById("dropdown");
const userOptions = document.getElementById("user-options");
const mobileMenu = document.querySelector(".mobile-menu");
const dropdownMobile = document.getElementById("dropdown-mobile");
const userOptionsMobile = document.getElementById("user-options-mobile");
const mobileMenuLinks = document.querySelector(".mobile-menu-links");
const body = document.body;
// const searchBtn = document.querySelector(".search-btn");
const mobileFormContainer = document.querySelector(".mobile-form-container");
const addProductBtn = document.getElementById("add-product");

const toggleFunc = (element, className) => {
  element.classList.toggle(className);
};

dropdown.addEventListener("click", () => {
  toggleFunc(userOptions, "user-options-visible");
});

dropdownMobile.addEventListener("click", () => {
  toggleFunc(userOptionsMobile, "user-options-mobile-visible");
});

mobileMenu.addEventListener("click", () => {
  // when mobile menu is closed hide logout
  if (!mobileMenu.classList.contains("mobile-menu-open")) {
    if (userOptionsMobile.classList.contains("user-options-mobile-visible")) {
      userOptionsMobile.classList.remove("user-options-mobile-visible");
    }
  }
  mobileMenu.classList.toggle("mobile-menu-open");
  toggleFunc(mobileMenuLinks, "mobile-menu-links-visible");
  mobileMenu.classList.contains("mobile-menu-open")
    ? body.classList.add("no-scroll")
    : body.classList.remove("no-scroll");
});
