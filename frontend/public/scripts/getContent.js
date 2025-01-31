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

// This function gets the content of the page requested
const getContent = (apiUrl) => {
  const accessToken = getCookieValue("accessToken");

  if (!accessToken) {
    window.open("login.html", "_self");
    return;
  }
  const verifyToken = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        window.open("login.html", "_self");
        return;
      } else {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const username = payload.username;
        const usernameMobile = document.getElementById("username-mobile");
        const usernameDesktop = document.getElementById("username");
        const welcomeMsg = document.getElementById("welcome-msg");

        const updateUsername = (element) => {
          element.innerHTML = username;
        };
        if (usernameMobile) updateUsername(usernameMobile);
        if (usernameDesktop) updateUsername(usernameDesktop);
        if (welcomeMsg) welcomeMsg.textContent = `Welcome ${username}!`;
      }
    } catch (error) {
      console.error(error);
    }
  };
  verifyToken();
};

export { getCookieValue, getContent };
