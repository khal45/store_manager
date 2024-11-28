import "../middleware/authMiddleware.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const loginRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/login.html");

// middleware

loginRouter.use(
  express.static(path.join(__dirname, "../../../frontend/node_modules"))
);
loginRouter.use(
  express.static(path.join(__dirname, "../../../frontend/public"))
);

loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({ extended: true }));

loginRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

loginRouter
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

export default loginRouter;
