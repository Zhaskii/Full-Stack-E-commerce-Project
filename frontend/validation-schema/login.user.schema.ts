import * as yup from "yup";

export const loginCredentialSchema = yup.object({
  email: yup
    .string()
    .email("It must be a valid email.")
    .required(" Email is required.")
    .trim()
    .lowercase(),
  password: yup.string().required("Password is required.").trim(),
});
