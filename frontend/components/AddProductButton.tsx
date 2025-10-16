"use client";
import { Box, Fab, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import type React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const AddProductButton: React.FC = () => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Box
      className="fixed right-15 bottom-12 z-10"
      sx={{
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Tooltip
        title="Add New Product"
        placement="left"
        arrow
        open={showTooltip}
      >
        <Fab
          aria-label="add product"
          onClick={() => {
            router.push("/add-product");
          }}
          sx={{
            padding: "35px",
            background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
            color: "#ffffff",
            boxShadow: "0 10px 20px rgba(76, 175, 80, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #43A047, #1B5E20)",
              boxShadow: "0 14px 24px rgba(76, 175, 80, 0.5)",
            },
            "&:active": {
              boxShadow: "0 6px 12px rgba(76, 175, 80, 0.3)",
              transform: "translateY(2px)",
            },
          }}
        >
          <Box
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <AddIcon fontSize="large" />
          </Box>
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default AddProductButton;
