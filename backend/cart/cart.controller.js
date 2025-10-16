import express from "express";
import { isBuyer } from "../middleware/authentication.middleware.js";
import { addItemToCartSchema } from "./cart.validation.js";
import mongoose from "mongoose";
import ProductTable from "../product/product.model.js";
import CartTable from "./cart.model.js";
import { getCartItemCount } from "./cart.service.js";

const router = express.Router();

router.post(
  "/cart/item/add",
  isBuyer,
  async (req, res, next) => {
    try {
      const validatedData = await addItemToCartSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  (req, res, next) => {
    const productId = req.body.productId;

    const isValidId = mongoose.isValidObjectId(productId);

    if (!isValidId) {
      return res.status(400).send({ message: "Invalid product ID format." });
    }

    next();
  },
  async (req, res) => {
    const productId = req.body.productId;

    const product = await ProductTable.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    const cart = await CartTable.findOne({
      productId,
      buyerId: req.loggedInUserId,
    });

    if (cart) {
      return res.status(409).send({
        message:
          "Already in your cart! Consider increasing the quantity if you need more.",
      });
    }

    const orderedQuantity = req.body.orderedQuantity;

    if (orderedQuantity > product.quantity) {
      return res.status(409).send({
        message: "Ordered quantity exceeds available stock.",
      });
    }

    await CartTable.create({
      buyerId: req.loggedInUserId,
      productId,
      orderedQuantity,
    });

    return res
      .status(200)
      .send({ message: "Success! The item is now in your shopping cart." });
  }
);

router.delete(
  "/cart/item/delete/:id",
  isBuyer,
  (req, res, next) => {
    const cartId = req.params.id;

    const isValidId = mongoose.isValidObjectId(cartId);

    if (!isValidId) {
      return res.status(400).send({ message: "Invalid cart item ID format." });
    }
    next();
  },
  async (req, res) => {
    const cartId = req.params.id;

    const cart = await CartTable.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).send({ message: "Cart item not found." });
    }

    const isOwnerOfCart = cart.buyerId.equals(req.loggedInUserId);

    if (!isOwnerOfCart) {
      return res.status(408).send({
        message: "Access denied. You do not own this cart item.",
      });
    }

    await CartTable.deleteOne({ _id: cartId });

    return res.status(200).send({ message: "Cart item deleted successfully." });
  }
);

router.delete("/cart/flush", isBuyer, async (req, res) => {
  const buyerId = req.loggedInUserId;

  await CartTable.deleteMany({ buyerId: buyerId });

  return res.status(200).send({ message: "Cart emptied successfully." });
});

router.post("/cart/list", isBuyer, async (req, res) => {
  const carts = await CartTable.aggregate([
    {
      $match: {
        buyerId: req.loggedInUserId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    {
      $project: {
        orderedQuantity: 1,
        product: {
          name: { $first: "$productDetail.name" },
          price: { $first: "$productDetail.price" },
          quantity: { $first: "$productDetail.quantity" },
          image: { $first: "$productDetail.image" },
          category: { $first: "$productDetail.category" },
          brand: { $first: "$productDetail.brand" },
        },
      },
    },
  ]);
  return res
    .status(200)
    .send({ message: "Cart items fetched successfully.", cartItems: carts });
});

router.get("/cart/item/count", isBuyer, getCartItemCount);

export { router as cartController };
