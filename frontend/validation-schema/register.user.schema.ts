import * as yup from "yup";
import dayjs from "dayjs";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid and properly formatted email address.")
    .required("Email is absolutely required.")
    .trim()
    .lowercase()
    .max(100, "Email must be concise and within 100 characters."),

  password: yup
    .string()
    .required("A strong password is required for security.")
    .trim()
    .min(8, "Password must be at least 8 characters long for safety.")
    .max(30, "Password should be simple yet within 30 characters."),

  firstName: yup
    .string()
    .required("First name is an essential field.")
    .trim()
    .max(100, "First name should be short and under 100 characters."),

  lastName: yup
    .string()
    .required("Last name is an important field.")
    .trim()
    .max(100, "Last name should be clear and within 100 characters."),

  dob: yup
    .date()
    .max(
      dayjs(),
      "Date of birth cannot be in the future. Please enter a valid date."
    )
    .notRequired(),

  gender: yup
    .string()
    .required("Please specify your gender.")
    .trim()
    .oneOf(["male", "female", "other"], "Choose a valid gender option."),

  role: yup
    .string()
    .required("User role selection is mandatory.")
    .trim()
    .oneOf(
      ["seller", "buyer"],
      "Role must be accurately chosen as 'seller' or 'buyer'."
    ),

  address: yup
    .string()
    .required("A complete and valid address is required.")
    .trim()
    .max(255, "Address should be detailed yet within 255 characters."),
});
