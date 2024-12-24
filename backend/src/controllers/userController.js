import users from "../database/usersDb.js";
import { fileURLToPath } from "url";
import path from "path";
import { hashSync, compareSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(
  __dirname,
  "../../../frontend/views/users-page.html"
);

const getUser = (req, res) => {
  res.sendFile(filePath);
};

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

export { getUser, createUser };
