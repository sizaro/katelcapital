import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findUserByEmail, findUserById } from "../models/usersModel.js";
import dotenv from "dotenv";
dotenv.config();


passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log("🔹 /login route hit, body:", email, password);
      try {
        const user = await findUserByEmail(email);
        if (!user) return done(null, false, { message: "Incorrect email." });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password." });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
  });
});

passport.deserializeUser(async (sessionUser, done) => {
  try {
    const { id } = sessionUser;

    if (!id) {
      return done(null, false);
    }

    const user = await findUserById(id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

