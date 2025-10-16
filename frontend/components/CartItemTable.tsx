import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { ICartItem } from "./CartItemSection";
import FlushCartButton from "./FlushCartButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import { AxiosResponse } from "axios";
import { fallBackProductImage } from "@/constant/general.constant";

interface IProps {
  cartItemList?: ICartItem[];
}

interface ICartItemDeleteRes extends AxiosResponse {
  data: {
    message: string;
  };
}

const CartItemTable = (props: IProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async (cartId: string) => {
      return await axiosInstance.delete(`/cart/item/delete/${cartId}`);
    },
    onSuccess: (res: ICartItemDeleteRes) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["cart-list"] });
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Box className="w-screen p-8 ">
      {isPending && <LinearProgress color="success" />}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Box
          className="flex justify-end p-4"
          sx={{
            borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <FlushCartButton />
        </Box>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="shopping cart table"
        >
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,
                  borderBottom: "2px solid #1C5E20",
                }}
              >
                S.N
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Image
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Price per unit
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Sub-Total
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  py: 2.5,

                  borderBottom: "2px solid #1C5E20",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.cartItemList &&
              props.cartItemList.length > 0 &&
              props.cartItemList.map((item, index) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(28, 94, 32, 0.04)",
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 500,
                        fontSize: "16px",
                        py: 3,
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 200,
                          height: 180,
                          borderRadius: 1,
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <Image
                          src={item.product.image || fallBackProductImage}
                          alt="Product Image"
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 500,
                        fontSize: "16px",
                        py: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: "#333",
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <Chip
                        label={item.product.brand}
                        color="success"
                        sx={{
                          fontWeight: 500,
                          bgcolor: "#1C5E20",
                          "& .MuiChip-label": {
                            px: 1.5,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        py: 3,
                        color: "#1C5E20",
                      }}
                    >
                      ${item.product.price}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 500,
                        fontSize: "16px",
                        py: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 3,
                          py: 1,
                          borderRadius: 1,
                          bgcolor: "#f5f5f5",
                          fontWeight: 600,
                        }}
                      >
                        {item.orderedQuantity}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 700,
                        fontSize: "18px",
                        py: 3,
                        color: "#1C5E20",
                      }}
                    >
                      ${item.product.price * item.orderedQuantity}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        py: 3,
                      }}
                    >
                      <Tooltip title="Remove">
                        <IconButton
                          onClick={() => {
                            mutate(item._id);
                          }}
                          color="error"
                          sx={{
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(211, 47, 47, 0.1)",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <ClearSharpIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartItemTable;
