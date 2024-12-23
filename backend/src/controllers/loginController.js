import users from "../database/usersDb.js";
import { v4 as uuidv4 } from "uuid";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../../frontend/views/login.html");

const accessKey = process.env.ACCESS_TOKEN_SECRET;
const uniqueId = uuidv4();

const getLogin = (req, res) => {
  res.sendFile(filePath);
};

const postLogin = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ message: "user does not exist" });
  }

  const passwordsMatch = compareSync(password, user.password);

  if (passwordsMatch) {
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      accessKey,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.redirect("/products");
  } else {
    return res.status(401).json({ message: "incorrect password" });
  }
};

// The following route does not have a UI and is only available to the admin

const createUser = (req, res, next) => {
  const { username, password, role } = req.body;
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    res.status(409).json({
      status: "Fail",
      message: "User already exists!",
    });
  } else {
    const hashedPassword = hashSync(password, 10);
    const newUser = {
      id: uniqueId,
      username: username,
      role: role,
      password: hashedPassword,
    };
    users.push(newUser);
    res.json(newUser);
  }
};

export { getLogin, postLogin, createUser };
