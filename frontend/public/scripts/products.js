import { getContent, getCookieValue } from "./getContent.js";
const apiUrl = "http://localhost:4000/api/v1/products";
getContent(apiUrl);

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.querySelector(".msg");
  const createProductForm = document.getElementById("create-form");
  const createRecordForm = document.getElementById("create-record-form");
  const accessToken = getCookieValue("accessToken");

  const createProduct = async (event) => {
    event.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productDescription =
      document.getElementById("description-text").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName, productDescription, price, stock }),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (!response.ok) {
        msg.textContent = data.message || "An error occured try again!";
        if (msg.classList.contains("msg-success")) {
          msg.classList.remove("msg-success");
          msg.classList.toggle("msg-failure");
        } else if (msg.classList.contains("msg-failure")) {
          return;
        } else {
          msg.classList.toggle("msg-failure");
        }
        return;
      }

      if (data.success) {
        msg.textContent = data.message || "Operation successful!";
        if (msg.classList.contains("msg-failure")) {
          msg.classList.remove("msg-failure");
          msg.classList.toggle("msg-success");
        } else if (msg.classList.contains("msg-success")) {
          return;
        } else {
          msg.classList.toggle("msg-success");
        }
        addProductToDisplay(productName, price, stock, 0);
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addProductToDisplay = (name, price, stock, sold) => {
    const productsDisplay = document.querySelector(".products-display");
    // Create anchor tag
    const itemAnchor = document.createElement("a");
    itemAnchor.href = "product-details-page.html";
    itemAnchor.classList.add("item-anchor");

    // Create item div
    itemAnchor.innerHTML = `
        <div class="item">
                  <div class="img-div">
                    <img src="../public/images/Nike shoe.jpg" alt="nike shoe" />
                  </div>
                  <div class="info">
                    <h5>${name}</h5>
                    <p class="p-small">${price}</p>
                    <div class="inventory">
                      <div class="inventory-child">
                        <p class="p-small">stock</p>
                        <h6>${stock}</h6>
                      </div>
                      <div class="inventory-child">
                        <p class="p-small">sold</p>
                        <h6>${sold}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="product-card">
                    <div class="card-header">
                      <img
                        src="../public/svgs/rhombus-svgrepo-com.svg"
                        alt="rhombus"
                      />
                      <p class="text-small">productCard</p>
                      <img
                        src="../public/svgs/caret-down-thin-svgrepo-com.svg"
                        alt="caret-down"
                      />
                    </div>
                    <div class="info-container">
                      <div class="info-details">
                        <p class="info-text">productName</p>
                        <p class="info-text">productPrice</p>
                        <p class="info-text">stockTotal</p>
                        <p class="info-text">productSold</p>
                      </div>
                      <div class="info-details">
                        <p class="text-small">${name}</p>
                        <p class="text-small">${price}</p>
                        <p class="text-small">${stock}</p>
                        <p class="text-small">${sold}</p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
    `;

    // Append to products display
    productsDisplay.appendChild(itemAnchor);
  };

  const createRecord = async (event) => {
    event.preventDefault();
    const productName = document.getElementById("product-name").value;
    const quantity = document.getElementById("quantity").value;
    const unitPrice = document.getElementById("unit-price").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const status = document.getElementById("status").value;

    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          quantity,
          unitPrice,
          paymentMethod,
          status,
        }),
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/sales",
        options
      );
      const data = await response.json();

      if (!response.ok) {
        msg.textContent = data.message || "An error occured try again!";
        if (msg.classList.contains("msg-success")) {
          msg.classList.remove("msg-success");
          msg.classList.toggle("msg-failure");
        } else if (msg.classList.contains("msg-failure")) {
          return;
        } else {
          msg.classList.toggle("msg-failure");
        }
        return;
      }

      if (data.success) {
        msg.textContent = data.message || "Operation successful!";
        if (msg.classList.contains("msg-failure")) {
          msg.classList.remove("msg-failure");
          msg.classList.toggle("msg-success");
        } else if (msg.classList.contains("msg-success")) {
          return;
        } else {
          msg.classList.toggle("msg-success");
        }
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (createProductForm) {
    createProductForm.addEventListener("submit", createProduct);
  }

  if (createRecordForm) {
    createRecordForm.addEventListener("submit", createRecord);
  }
});
