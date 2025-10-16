import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import { AxiosResponse } from "axios";

interface Props {
  totalQuantity: number;
  productId: string;
}

interface IAddToCartResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

const AddToCart = (props: Props) => {
  const [count, setCount] = useState(1);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<IAddToCartResponse, IError>({
    mutationKey: ["add-cart-items"],
    mutationFn: async () => {
      return await axiosInstance.post("/cart/item/add", {
        productId: props.productId,
        orderedQuantity: count,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cart-item-count"] });
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Box className="flex flex-col gap-4 ">
      <Box className="flex justify-center items-center gap-4">
        <IconButton
          disabled={count === 1}
          color="success"
          onClick={() => {
            const newCount = count - 1;
            if (newCount > 0) {
              setCount(newCount);
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="h5">{count}</Typography>
        <IconButton
          disabled={count === props.totalQuantity}
          color="success"
          onClick={() => {
            let newCount = count + 1;
            if (newCount <= props.totalQuantity) {
              setCount(newCount);
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        color="success"
        startIcon={<ShoppingCartSharpIcon />}
        onClick={() => {
          mutate();
        }}
      >
        Add to cart
      </Button>
    </Box>
  );
};

export default AddToCart;
