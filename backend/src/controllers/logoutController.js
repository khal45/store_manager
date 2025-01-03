const logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/api/v1");
};

export { logout };
