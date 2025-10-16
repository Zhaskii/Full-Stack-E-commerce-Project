"use client";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";

import DeleteProductDialog from "./DeleteProductDialog";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { useParams, useRouter } from "next/navigation";
import AddToCart from "./AddToCart";
import type { IError } from "@/interface/error.interface";
import { fallBackProductImage } from "@/constant/general.constant";

interface IProductDetails {
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
  description: string;
  freeShipping: boolean;
}

const ProductDetailSection: React.FC = () => {
  const [userRole, setUserRole] = useState("");

  const router = useRouter();

  const params = useParams();

  const productId = params.id as string;

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      setUserRole(window.localStorage.getItem("role") as string);
    }
  }, []);

  const { data, isLoading, error, isError } = useQuery<IProductDetails, IError>(
    {
      queryKey: ["get-product-details", productId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `/product/detail/${productId}`
        );
        return response.data.productDetails as IProductDetails;
      },
    }
  );

  const handleGoBack = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[50vh]">
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="p-4">
        <IconButton
          color="success"
          onClick={handleGoBack}
          sx={{
            mb: 2,
            transition: "transform 0.2s",
            "&:hover": { transform: "translateX(-5px)" },
          }}
        >
          <ArrowBackIosNewSharpIcon />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            Back
          </Typography>
        </IconButton>
        <Typography color="error">
          Error loading product:
          {error.response.data.message}
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box className="p-4">
        <IconButton
          color="success"
          onClick={handleGoBack}
          sx={{
            mb: 2,
            transition: "transform 0.2s",
            "&:hover": { transform: "translateX(-5px)" },
          }}
        >
          <ArrowBackIosNewSharpIcon />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            Back
          </Typography>
        </IconButton>
        <Typography>No product details available.</Typography>
      </Box>
    );
  }

  const {
    name,
    brand,
    category,
    price,
    quantity,
    image,
    description,
    freeShipping,
  } = data;

  return (
    <Box className="w-full max-w-7xl mx-auto px-4 py-6">
      <Box className="mb-4 flex items-center">
        <IconButton
          color="success"
          onClick={handleGoBack}
          sx={{
            transition: "transform 0.2s",
            "&:hover": { transform: "translateX(-5px)" },
            paddingTop: "40px",
          }}
          aria-label="Go back to previous page"
        >
          <ArrowBackIosNewSharpIcon />
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 200,
            color: "darkgreen",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
            paddingTop: "30px",
          }}
          onClick={handleGoBack}
        >
          Check Out More
        </Typography>
      </Box>

      <Paper
        elevation={3}
        className="flex flex-col md:flex-row bg-[#e1ede1] gap-8 w-full shadow-lg p-4 md:p-10 mb-[110px] rounded-3xl"
        sx={{
          bgcolor: "#e1ede1",
          boxShadow:
            "0 10px 15px -3px rgba(0, 95, 86, 0.3), 0 4px 6px -4px rgba(0, 95, 86, 0.2)",
        }}
      >
        <Box className="w-full md:w-[50%] flex justify-center items-center">
          <Image
            src={image || fallBackProductImage}
            width={800}
            height={400}
            alt={name || "Product Image"}
            style={{ objectFit: "cover", maxHeight: "400px" }}
            className="cursor-pointer rounded-lg"
          />
        </Box>
        <Box className="flex flex-col items-start gap-4 w-full md:w-[50%]">
          <Box className="flex flex-wrap gap-4 items-center">
            <Typography variant="h4" color="success" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Chip label={brand} color="success" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 500, color: "#1C5E20" }}>
            ${price.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Available Quantity:{" "}
            <span style={{ fontWeight: 600 }}>{quantity}</span>
          </Typography>
          <Chip
            label={category}
            sx={{ color: "darkgreen", bgcolor: "rgba(28, 94, 32, 0.1)" }}
          />
          <FormControlLabel
            control={<Checkbox color="success" checked={freeShipping} />}
            label="Free Shipping"
          />
          <Typography
            className="text-base text-justify rounded pt-4"
            sx={{
              borderTop: "2px solid rgba(128, 128, 128, 0.3)",
              width: "100%",
            }}
          >
            {description}
          </Typography>

          {userRole === "seller" && (
            <Box className="w-full flex gap-8 mt-4">
              <Button
                onClick={() => {
                  router.push(`/edit-product/${productId}`);
                }}
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<EditSquareIcon />}
                sx={{
                  bgcolor: "#1C5E20",
                  "&:hover": { bgcolor: "#0F4C12" },
                }}
              >
                Edit
              </Button>

              <DeleteProductDialog productId={productId} />
            </Box>
          )}

          {userRole === "buyer" && (
            <Box className="w-full mt-4">
              <AddToCart totalQuantity={quantity} productId={productId} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetailSection;
