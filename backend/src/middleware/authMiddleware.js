import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessKey = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, accessKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "Admin") return res.sendStatus(403);
    next();
  } catch (err) {
    console.log(err);
  }
};

export { verifyToken, isAdmin };
