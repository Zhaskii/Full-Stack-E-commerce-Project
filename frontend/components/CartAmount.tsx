import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ICartItem } from "./CartItemSection";

interface IProps {
  cartItemList?: ICartItem[];
}

const CartAmount = (props: IProps) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "66.666%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        my: 6,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          position: "relative",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 3,
            backgroundColor: "#1C5E20",
            borderRadius: 4,
          },
        }}
      >
        Checkout Summary
      </Typography>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          width: "100%",
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                colSpan={2}
                sx={{
                  py: 2.5,
                  px: 4,
                  borderBottom: "2px solid #1C5E20",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1C5E20",
                  }}
                >
                  Order Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cartItemList &&
              props.cartItemList.map((item, index) => {
                return (
                  <>
                    <TableRow
                      key={item._id}
                      sx={{
                        transition: "background-color 0.2s ease",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          fontSize: "16px",
                          py: 3,
                          px: 4,
                          borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                        }}
                      >
                        Sub Total
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          fontSize: "16px",
                          py: 3,
                          px: 4,
                          borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                        }}
                      >
                        ${item.product.price * item.orderedQuantity}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        transition: "background-color 0.2s ease",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          fontSize: "16px",
                          py: 3,
                          px: 4,
                          borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                        }}
                      >
                        Discount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          fontSize: "16px",
                          py: 3,
                          px: 4,
                          color: "#d32f2f",
                          borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
                        }}
                      >
                        -$
                        {(
                          item.product.price *
                          item.orderedQuantity *
                          0.2
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        backgroundColor: "#f9f9f9",
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(28, 94, 32, 0.05)",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          fontSize: "18px",
                          py: 3.5,
                          px: 4,
                          color: "#1C5E20",
                        }}
                      >
                        Grand Total
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 700,
                          fontSize: "20px",
                          py: 3.5,
                          px: 4,
                          color: "#1C5E20",
                        }}
                      >
                        $
                        {(
                          item.product.price *
                          item.orderedQuantity *
                          0.8
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mb: 1, color: "text.secondary" }}
        >
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </Typography>

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ShoppingCartCheckoutIcon />}
          sx={{
            py: 1.5,
            bgcolor: "#1C5E20",
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(28, 94, 32, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#0F4C12",
              boxShadow: "0 6px 16px rgba(28, 94, 32, 0.3)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 8px rgba(28, 94, 32, 0.2)",
            },
          }}
        >
          Proceed To Checkout
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Need help?{" "}
            <span
              style={{ color: "#1C5E20", fontWeight: 500, cursor: "pointer" }}
            >
              Contact Support
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartAmount;
