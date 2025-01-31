const logout = document.querySelectorAll("#logout-btn");
const logoutMobile = document.querySelectorAll("#logout-btn-mobile");

const logoutFunc = (logoutButton) => {
  logoutButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.open("login.html", "_self");
      return;
    });
  });
};

if (logout) logoutFunc(logout);
if (logoutMobile) logoutFunc(logoutMobile);
