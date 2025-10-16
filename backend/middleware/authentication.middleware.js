import jwt from "jsonwebtoken";
import UserTable from "../user/user.model.js";

export const isSeller = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload = null;

  try {
    const secretKey = "jlhfgwopieufmqpoe69";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};

export const isBuyer = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload = null;

  try {
    const secretKey = "jlhfgwopieufmqpoe69";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};

export const isUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload = null;

  try {
    const secretKey = "jlhfgwopieufmqpoe69";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};
