import CartItemSection from "@/components/CartItemSection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart Page | Cart Amount | Checkout",
};

const CartPage = () => {
  return (
    <>
      <CartItemSection />
    </>
  );
};

export default CartPage;
