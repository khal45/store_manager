const body = document.body;

const toggleFunc = (element, className) => {
  element.classList.toggle(className);
};

const dropdown = document.querySelectorAll("#dropdown");
const userOptions = document.querySelectorAll("#user-options");

dropdown.forEach((element) => {
  element.addEventListener("click", () => {
    userOptions.forEach((option) => {
      toggleFunc(option, "user-options-visible");
    });
  });
});

const dropdownMobile = document.querySelectorAll("#dropdown-mobile");
const userOptionsMobile = document.querySelectorAll("#user-options-mobile");

dropdownMobile.forEach((element) => {
  element.addEventListener("click", () => {
    userOptionsMobile.forEach((option) => {
      toggleFunc(option, "user-options-mobile-visible");
    });
  });
});

const mobileMenu = document.querySelectorAll(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links");

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

const apiUrl = "http://localhost:4000/api/v1/users/currentUser";
const dbUrl = "http://localhost:4000/api/v1/users/UserDb";

// fetch data from api here

const updateNavbar = (username) => {
  const usernames = document.querySelectorAll("#username");
  usernames.forEach((user) => {
    user.innerHTML = username || "John Doe";
  });
};

const updateWelcomeMsg = (user) => {
  const welcomeMsg = document.querySelectorAll("#welcome-msg");
  welcomeMsg.forEach((msg) => {
    msg.innerHTML = `Welcome ${user.username}!`;
  });
};

const fetchCurrentUser = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateNavbar(data.username);
    updateWelcomeMsg(data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// function to dynamically set the href of each attendant to his/her sales page from the navbar
const setHref = (value) => {
  const users = document.querySelectorAll(".username");
  users.forEach((user) => {
    user.href = value;
  });
};

// function to dynamically set the href of each attendant to his/her sales page from the users page
const setUserHref = (database) => {
  const userLink = document.querySelectorAll(".user-link");

  userLink.forEach((user) => {
    const uiUsername = user.innerHTML;
    database.forEach((data) => {
      if (uiUsername === data.username) {
        if (data.role === "Admin") {
          user.href = "#";
        }
        if (data.role === "Attendant") {
          user.href = `/api/v1/users/sales/${data.id}`;
        }
      }
    });
  });
};

// parent function to dynamically set the href of each attendant to his/her sales page
const updateUserLink = async () => {
  try {
    const response = await fetch(apiUrl);
    const databaseRes = await fetch(dbUrl);
    const database = await databaseRes.json();
    const data = await response.json();
    setUserHref(database);
    const { id } = data;
    const { role } = data;
    const attendantHref = `/api/v1/users/sales/${id}`;
    if (role === "Admin") {
      setHref("#");
    }
    if (role === "Attendant") {
      setHref(attendantHref);
    }
  } catch (error) {
    console.error(error);
  }
};

updateUserLink();
fetchCurrentUser();

// end of fetch
