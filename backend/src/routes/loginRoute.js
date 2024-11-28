import passport from "passport";

export default (app, filePath) => {
  app
    .route("/")
    .get((req, res) => {
      res.sendFile(filePath);
    })
    .post(
      passport.authenticate("local", {
        session: false,
        successRedirect: "/products",
        failureRedirect: "/",
      })
    );
};
