import React from "react";
import { Metadata } from "next";
import RegisterForm from "../../../components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "This is a register page",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
