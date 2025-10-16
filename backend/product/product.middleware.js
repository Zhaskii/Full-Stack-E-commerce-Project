import ProductTable from "./product.model.js";

export const isOwnerOfProduct = async (req, res, next) => {
  const productId = req.params.id;

  const product = await ProductTable.findOne({ _id: productId });

  if (!product) {
    return res.status(404).send({ message: "Product does not exists." });
  }

  const isOwnerOfProduct = product.sellerId?.equals(req.loggedInUserId);

  if (!isOwnerOfProduct) {
    return res
      .status(409)
      .send({ message: "You do not have access to this resource." });
  }

  next();
};
