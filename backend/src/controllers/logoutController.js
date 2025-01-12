const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ success: true });
};

export { logout };
