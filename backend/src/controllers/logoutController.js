const logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

export { logout };
