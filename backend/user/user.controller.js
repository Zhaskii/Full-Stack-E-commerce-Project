import express from "express";
import {
  loginCredentialSchema,
  registerUserSchema,
} from "./user.validation.js";
import UserTable from "./user.model.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/user/register",
  validateReqBody(registerUserSchema),
  async (req, res) => {
    const newUser = req.body;

    const user = await UserTable.findOne({ email: newUser.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "An account with this email already exists." });
    }

    const plainPassword = newUser.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    newUser.password = hashedPassword;

    await UserTable.create(newUser);

    return res
      .status(201)
      .send({ message: "User registered successfully. Welcome aboard!" });
  }
);

router.post(
  "/user/login",
  validateReqBody(loginCredentialSchema),
  async (req, res) => {
    const loginCredentials = req.body;

    const user = await UserTable.findOne({ email: loginCredentials.email });

    if (!user) {
      return res.status(404).send({ message: "No registered account found." });
    }

    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Authentication failure" });
    }

    const payload = { email: user.email };
    const secretKey = "jlhfgwopieufmqpoe69";

    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    user.password = undefined;

    return res.status(200).send({
      message: "Login successful! You're now signed in.",
      accessToken: token,
      userDetails: user,
    });
  }
);

export { router as userController };
