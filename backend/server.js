import "./src/middleware/authMiddleware.js";
import loginRoute from "./src/routes/loginRoute.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../frontend/views/login.html");

const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.join(__dirname, "../frontend/node_modules")));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
loginRoute(app, filePath);

// start the server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
