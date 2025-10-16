import { productCategories } from "@/constant/general.constant";
import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("A product name is required.")
    .trim()
    .max(255, "Product name should be concise and under 255 characters."),

  brand: yup
    .string()
    .required("Brand is required to ensure authenticity.")
    .trim()
    .max(255, "Brand name should be clear and within 255 characters."),

  price: yup
    .number()
    .required("Price is required to list the product.")
    .min(0, "Price must be a valid, positive number."),

  quantity: yup
    .number()
    .required("Please specify the available quantity.")
    .min(1, "Quantity must be at least 1.")
    .integer("Quantity should be a whole number."),

  category: yup
    .string()
    .required("Category selection is mandatory.")
    .trim()
    .oneOf(productCategories, "Please select a valid category."),

  freeShipping: yup.boolean().notRequired().default(false),

  description: yup
    .string()
    .required("A detailed description enhances customer trust.")
    .trim()
    .min(10, "Description should be at least 10 characters long.")
    .max(1000, "Keep the description informative but under 1000 characters."),
});
