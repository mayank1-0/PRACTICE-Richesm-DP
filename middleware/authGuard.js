module.exports = (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/");
    }
  } catch {
    res.redirect("/");
  }
};
