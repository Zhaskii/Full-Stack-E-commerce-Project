import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "grocery",
        "clothing",
        "kids",
        "stationery",
        "kitchen",
        "furniture",
        "electronics",
        "electrical",
        "sports",
      ],
    },
    image: {
      type: String,
      required: false,
      nullable: true,
    },
    freeShipping: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },

    sellerId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductTable = mongoose.model("Product", productSchema);

export default ProductTable;
