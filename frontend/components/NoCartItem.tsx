"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const NoCartItem = () => {
  const router = useRouter();
  return (
    <Box className="flex flex-col w-1/3 justify-center items-center gap-8 shadow-2xl shadow-[#005F56] p-6 m-[180px] ">
      <Typography variant="h4">Looks like your cart is empty.</Typography>
      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={() => {
          router.push("/");
        }}
      >
        Start shopping now!
      </Button>
    </Box>
  );
};

export default NoCartItem;
