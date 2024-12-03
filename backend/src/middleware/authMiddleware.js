import users from "../database/usersDb.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

// 1. get the role of the user
// 2.

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const user = users.find((user) => user.username === username);

      if (!user) {
        console.log("user does not exist");
        return cb(null, false, { error: "user does not esist" });
      }

      if (user.role === "Admin") {
        console.log("users is an admin");
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        console.log(`welcome ${user.username}`);
        return cb(null, user);
      } else {
        console.error("incorrect password");
        return cb(null, false, { error: "incorrect password" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

// serialization
passport.serializeUser((user, cb) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found."));
  }
});
