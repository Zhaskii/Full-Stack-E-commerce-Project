"use client";
import React, { useEffect, useState } from "react";
import SellerCardContainer from "./SellerCardContainer";
import BuyerCardContainer from "./BuyerCardContainer";
import { Box } from "@mui/material";
import AddProductButton from "./AddProductButton";

const DecideCartContainer = () => {
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = window.localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    } else {
      setError("Access Denied.");
    }
  }, []);

  if (userRole === "seller") {
    return (
      <Box className="flex flex-col justify-center items-center">
        <SellerCardContainer userRole={userRole} />
        <AddProductButton />
      </Box>
    );
  } else if (userRole === "buyer") {
    return <BuyerCardContainer userRole={userRole} />;
  }
};

export default DecideCartContainer;
