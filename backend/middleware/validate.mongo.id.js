import mongoose from "mongoose";

export const validateMongoIdFromReqParams = (req, res, next) => {
  const id = req.params.id;

  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
    return res.status(400).send({ message: "Invalid id." });
  }

  next();
};
