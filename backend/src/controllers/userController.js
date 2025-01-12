import users from "../database/usersDb.js";
import { hashSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

const getUser = (req, res) => {
  res.json(users);
};

// // This gets the userdb to be used to dynamically set the href of each user in the frontend
// const getUserDb = (req, res) => {
//   res.json(users);
// };

// // This gets the current user from the request to be used to dynamically update the ui
// const getCurrentUser = (req, res) => {
//   res.json(req.user);
// };

const createUser = (req, res) => {
  const { username, password, role } = req.body;

  const requiredFields = ["username", "password", "role"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  const userExists = users.find((user) => user.username === username);

  if (missingFields.length > 0) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  } else {
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
  }
};

export {
  getUser,
  createUser,
  //  getCurrentUser,
  // getUserDb
};
