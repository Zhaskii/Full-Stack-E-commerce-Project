import express from "express";
import {
  isBuyer,
  isSeller,
  isUser,
} from "../middleware/authentication.middleware.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.mongo.id.js";
import ProductTable from "./product.model.js";
import { productSchema } from "./product.validation.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { paginationSchema } from "../shared/pagination.schema.js";
import { isOwnerOfProduct } from "./product.middleware.js";

const router = express.Router();

router.post(
  "/product/add",
  isSeller,
  validateReqBody(productSchema),
  async (req, res) => {
    const newProduct = req.body;

    const sellerId = req.loggedInUserId;

    await ProductTable.create({ ...newProduct, sellerId });

    return res.status(201).send({ message: "Product is added successfully." });
  }
);

router.post(
  "/product/buyer/list",
  isBuyer,
  validateReqBody(paginationSchema),
  async (req, res) => {
    const paginationData = req.body;

    const limit = paginationData.limit;

    const page = paginationData.page;

    const skip = (page - 1) * limit;

    const products = await ProductTable.aggregate([
      {
        $match: {},
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          image: 1,
          brand: 1,
          price: 1,
          shortDescription: { $substr: ["$description", 0, 200] },
        },
      },
    ]);

    const totalItems = await ProductTable.find().countDocuments();

    const totalPage = Math.ceil(totalItems / limit);

    return res
      .status(200)
      .send({ message: "Success.", productList: products, totalPage });
  }
);

router.post(
  "/product/seller/list",
  isSeller,
  validateReqBody(paginationSchema),
  async (req, res) => {
    const paginationData = req.body;

    const page = paginationData.page;

    const limit = paginationData.limit;

    const skip = (page - 1) * limit;

    const products = await ProductTable.aggregate([
      {
        $match: {
          sellerId: req.loggedInUserId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      { $limit: limit },
      {
        $project: {
          name: 1,
          image: 1,
          brand: 1,
          price: 1,
          shortDescription: { $substr: ["$description", 0, 200] },
        },
      },
    ]);

    const totalItems = await ProductTable.find({
      sellerId: req.loggedInUserId,
    }).countDocuments();

    const totalPage = Math.ceil(totalItems / limit);
    return res
      .status(200)
      .send({ message: "Success.", productList: products, totalPage });
  }
);

router.get(
  "/product/detail/:id",
  isUser,
  validateMongoIdFromReqParams,
  async (req, res) => {
    const productId = req.params.id;

    const product = await ProductTable.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send({ message: "Product does ot exists." });
    }

    return res
      .status(200)
      .send({ message: "success", productDetails: product });
  }
);

router.delete(
  "/product/delete/:id",
  isSeller,
  validateMongoIdFromReqParams,
  isOwnerOfProduct,
  async (req, res) => {
    const productId = req.params.id;

    await ProductTable.deleteOne({ _id: productId });

    return res
      .status(200)
      .send({ message: "Product is deleted successfully." });
  }
);

router.put(
  "/product/edit/:id",
  isSeller,
  validateMongoIdFromReqParams,
  isOwnerOfProduct,
  validateReqBody(productSchema),
  async (req, res) => {
    const productId = req.params.id;

    const newValues = req.body;

    await ProductTable.updateOne(
      { _id: productId },
      {
        $set: {
          ...newValues,
        },
      }
    );

    return res
      .status(200)
      .send({ message: "Product is updated successfully." });
  }
);

export { router as productController };
