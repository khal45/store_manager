// This function gets the content of the page requested

export const getContent = (apiUrl) => {
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
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        window.open("login.html", "_self");
        return;
      } else {
        const userRes = await fetch(
          "http://localhost:4000/api/v1/users/currentUser",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const username = await userRes.json();
        const usernameMobile = document.getElementById("username-mobile");
        const usernameDesktop = document.getElementById("username");

        const updateUsername = (element) => {
          element.innerHTML = username;
        };
        if (usernameMobile) updateUsername(usernameMobile);
        if (usernameDesktop) updateUsername(usernameDesktop);
      }
    } catch (error) {
      console.error(error);
    }
  };
  verifyToken();
};
