import { Metadata } from "next";
import LoginForm from "../../../components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "This is a login page",
};

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
