import CartTable from "./cart.model.js";

export const getCartItemCount = async (req, res) => {
  const buyerId = req.loggedInUserId;

  const cartItemsCount = await CartTable.find({ buyerId }).countDocuments();

  return res
    .status(201)
    .send({ message: "success", totalCartItem: cartItemsCount });
};
