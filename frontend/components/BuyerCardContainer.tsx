import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { IProductCard } from "./SellerCardContainer";
import { IError } from "@/interface/error.interface";

export interface IData {
  productList: IProductCard[];
  totalPage: number;
}

const BuyerCardContainer = (props: { userRole: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, isError, error } = useQuery<IData, IError>({
    queryKey: ["buyer-list", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.post("/product/buyer/list", {
        page: currentPage,
        limit: 9,
      });
      return {
        productList: response?.data?.productList,
        totalPage: response?.data?.totalPage,
      };
    },
    enabled: props.userRole === "buyer",
  });

  if (isPending) {
    return <CircularProgress color="success" />;
  }
  return (
    <>
      <Typography
        variant="h3"
        color="success.main"
        sx={{
          fontWeight: 400,
          textAlign: "center",
          mt: 6,
          mb: 2,
          letterSpacing: 2,
          textTransform: "uppercase",
          borderBottom: "4px double #2e7d32",
          display: "inline-block",
          mx: "auto",
        }}
      >
        Explore Our Products
      </Typography>
      <Box className="flex flex-wrap gap-14 justify-center items-center p-8 m-8 ">
        {data?.productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        className="pb-8"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "green",
            "&.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "#2e7d32", // darker green on hover
              },
            },
          },
        }}
        page={currentPage}
        count={data?.totalPage}
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerCardContainer;
