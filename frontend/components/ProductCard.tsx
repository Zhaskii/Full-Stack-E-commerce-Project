import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IProductCard } from "./SellerCardContainer";
import { useRouter } from "next/navigation";
import { fallBackProductImage } from "@/constant/general.constant";

const ProductCard = (props: IProductCard) => {
  const router = useRouter();
  return (
    <Box className="w-[400px] bg-[#e1ede1] shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[#004C45]">
      <Image
        onClick={() => {
          router.push(`/product-detail/${props._id}`);
        }}
        src={props.image || fallBackProductImage}
        width={400}
        height={400}
        alt={props.name}
        style={{
          width: "400px",
          height: "250px",
          objectFit: "cover",
        }}
        className="rounded-t-2xl cursor-pointer border border-gray-200"
      />

      <Stack className="p-5 space-y-4">
        <Box className="flex justify-between items-center">
          <Typography variant="h5" className="font-semibold text-[#004C45]">
            {props.name}
          </Typography>
          <Chip label={props.brand} color="success" className="text-white" />
        </Box>

        <Typography variant="h6" className="text-gray-700 font-medium">
          Price:{" "}
          <span className="text-[#005F56] font-semibold">${props.price}</span>
        </Typography>

        <Typography className="text-base text-gray-600 text-justify leading-relaxed py-3">
          {props.shortDescription} ...
        </Typography>

        <Button
          onClick={() => {
            router.push(`/product-detail/${props._id}`);
          }}
          variant="contained"
          color="success"
          className="w-full py-2 text-lg font-semibold transition-all duration-300 hover:bg-[#004C45]"
        >
          Explore
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
