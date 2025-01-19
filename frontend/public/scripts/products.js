document.addEventListener("DOMContentLoaded", () => {
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

  if (!accessToken) {
    window.open("login.html", "_self");
    return;
  }
  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/products", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        window.open("login.html", "_self");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  verifyToken();
});
