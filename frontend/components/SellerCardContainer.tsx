"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { IData } from "./BuyerCardContainer";
import { IError } from "@/interface/error.interface";

export interface IProductCard {
  _id: string;
  image?: string;
  name: string;
  brand: string;
  price: number;
  shortDescription: string;
}

const SellerCardContainer = (props: { userRole: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, isError, error } = useQuery<IData, IError>({
    queryKey: ["seller-list", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.post("/product/seller/list", {
        page: currentPage,
        limit: 9,
      });
      return {
        productList: response?.data?.productList,
        totalPage: response?.data?.totalPage,
      };
    },
    enabled: props.userRole === "seller",
  });

  if (isPending) {
    return <CircularProgress color="success" />;
  }

  if (isError) {
    toast.error(error?.response?.data?.message);
    return;
  }

  return (
    <Box className="flex flex-col gap-4 justify-center items-center">
      <Typography
        sx={{
          fontWeight: 400,
          borderBottom: "5px double darkgreen",
          paddingTop: "32px",
        }}
        variant="h2"
        color="success"
      >
        Product List
      </Typography>
      <Box className="flex flex-wrap gap-14 justify-center items-center p-8 m-8 ">
        {data &&
          data.productList &&
          data.productList.map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })}
      </Box>

      {data.totalPage > 0 && (
        <Pagination
          className="pb-8"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "green",
              "&.Mui-selected": {
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2e7d32",
                },
              },
            },
          }}
          page={currentPage}
          count={data.totalPage}
          onChange={(_, value) => {
            setCurrentPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default SellerCardContainer;
