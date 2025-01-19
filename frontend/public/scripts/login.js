document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const errorMsg = document.querySelector(".error-msg");

  const login = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch("http://localhost:4000/api/v1", options);
      const data = await response.json();

      if (!response.ok) {
        errorMsg.textContent =
          data.message || "Login failed! check credentials and try again.";
        return;
      }

      if (data.success) {
        const oneDay = 60 * 60 * 24;
        const token = data.accessToken;
        document.cookie = `accessToken=${token}; path=/; max-age=${oneDay}; secure; samesite=strict;`;
        window.open("products.html", "_self");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  form.addEventListener("submit", login);
});
