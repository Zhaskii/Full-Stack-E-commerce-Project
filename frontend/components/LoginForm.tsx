"use client";
import { IError } from "@/interface/error.interface";
import { ILoginResponse } from "@/interface/login.interface";
import axiosInstance from "@/lib/axios.instance";
import { loginCredentialSchema } from "@/validation-schema/login.user.schema";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ILoginForm {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values: ILoginForm) => {
      return await axiosInstance.post("/user/login", values);
    },
    onSuccess: (res: ILoginResponse) => {
      const accessToken = res.data.accessToken;
      const firstName = res.data.userDetails.firstName;
      const role = res.data.userDetails.role;

      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("firstName", firstName);
      window.localStorage.setItem("role", role);
      toast.success(res.data.message);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Box className="flex flex-col">
      {isPending && <LinearProgress color="success" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginCredentialSchema}
        onSubmit={(values: ILoginForm) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 shadow-2xl shadow-[#005F56] p-4 min-w-[400px] justify-center items-center"
            >
              <Typography variant="h4" className="text-[#005F56]">
                Login
              </Typography>
              <FormControl fullWidth>
                <TextField label="Email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Stack className="w-full justify-center items-center gap-3">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "#005F56",
                  }}
                  disabled={isPending}
                >
                  submit
                </Button>

                <Link
                  className="text-[#005F56] font-sans text-[15px] hover:text-[#518480]"
                  href="/register"
                >
                  Sign up now and start your journey with us!
                </Link>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default LoginForm;
