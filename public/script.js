const dropdown = document.querySelectorAll("#dropdown");
const userOptions = document.querySelectorAll("#user-options");
const mobileMenu = document.querySelectorAll(".mobile-menu");
const dropdownMobile = document.querySelectorAll("#dropdown-mobile");
const userOptionsMobile = document.querySelectorAll("#user-options-mobile");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links");
const body = document.body;
const mobileFormContainer = document.querySelector(".mobile-form-container");
const addProductBtn = document.getElementById("add-product");
const saleElements = document.querySelectorAll(".sale");
const div2Elements = document.querySelectorAll(".div-2");
const showMore = document.querySelector(".show-more");
const addUser = document.querySelector(".add-user");
const createAttendant = document.querySelector(".create-attendant");

const toggleFunc = (element, className) => {
  element.classList.toggle(className);
};

dropdown.forEach((element) => {
  element.addEventListener("click", () => {
    userOptions.forEach((option) => {
      toggleFunc(option, "user-options-visible");
    });
  });
});

dropdownMobile.forEach((element) => {
  element.addEventListener("click", () => {
    userOptionsMobile.forEach((option) => {
      toggleFunc(option, "user-options-mobile-visible");
    });
  });
});

mobileMenu.forEach((menu) => {
  menu.addEventListener("click", () => {
    if (!menu.classList.contains("mobile-menu-open")) {
      userOptionsMobile.forEach((element) => {
        if (element.classList.contains("user-options-mobile-visible")) {
          element.classList.remove("user-options-mobile-visible");
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

saleElements.forEach((sale) => {
  sale.addEventListener("click", () => {
    let div2 = sale.children[1];
    let firstDiv3 = div2.children[0];
    let items = firstDiv3.children[0];
    let showMore = items.children[2];
    console.log(showMore);
    toggleFunc(div2, "expanded");
    toggleFunc(showMore, "h3-collapsed");
  });
});

addUser.addEventListener("click", () => {
  toggleFunc(createAttendant, "create-attendant-visible");
});
