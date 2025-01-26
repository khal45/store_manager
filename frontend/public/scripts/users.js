import { getContent } from "./getContent.js";
const apiUrl = "http://localhost:4000/api/v1/users";
getContent(apiUrl);

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.querySelector(".msg");
  const createUserForm = document.getElementById("create-attendant");
  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === cookieName) {
        return value;
      }
    }
    return null;
  };

  const accessToken = getCookieValue("accessToken");

  const addUser = async (event) => {
    event.preventDefault();
    const username = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/users/register",
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

  if (createUserForm) createUserForm.addEventListener("submit", addUser);
});
