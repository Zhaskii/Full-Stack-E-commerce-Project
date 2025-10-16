"use client";
import { productCategoriesForDropDown } from "@/constant/general.constant";
import type { IProductDetailResponse } from "@/interface/product.detail.response.interface";
import axiosInstance from "@/lib/axios.instance";
import { productSchema } from "@/validation-schema/add.product.schema";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  ShoppingBag as ShoppingBagIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  LocalShipping as LocalShippingIcon,
  AttachMoney as AttachMoneyIcon,
  Save as SaveIcon,
  Loyalty as BrandIcon,
} from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import type { IAddProductForm, IProductData } from "./AddProductForm";
import type { IError } from "@/interface/error.interface";
import toast from "react-hot-toast";
import type { IEditProductResponse } from "@/interface/edit.product.response.interface";

const EditProductForm = () => {
  const params = useParams();

  const router = useRouter();

  const productId = params.id;

  const { isPending, data, isError, error } = useQuery<
    IProductDetailResponse,
    IError
  >({
    queryKey: ["product-details"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/product/detail/${productId}`);
      return response.data?.productDetails;
    },
  });

  const { isPending: editPending, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values: IProductData) => {
      return await axiosInstance.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (res: IEditProductResponse) => {
      toast.success(res.data.message);
      router.push(`/product-detail/${productId}`);
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });
  if (isPending || editPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress color="success" size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box className="p-4 md:p-8 my-4 md:my-8 flex justify-center">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1C5E20",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <EditIcon sx={{ color: "white", fontSize: "28px" }} />
          <Typography
            variant="h4"
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Edit Product
          </Typography>
        </Box>
        <Formik
          enableReinitialize
          initialValues={{
            image: data?.image || "",
            name: data?.name || "",
            brand: data?.brand || "",
            price: data?.price || 0,
            quantity: data?.quantity || 1,
            category: data?.category || "",
            freeShipping: String(data?.freeShipping) || "",
            description: data?.description || "",
          }}
          validationSchema={productSchema}
          onSubmit={(values: IAddProductForm) => {
            const newValues = {
              ...values,
              freeShipping: values.freeShipping === "true",
            };
            mutate(newValues);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-5 p-8"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#666",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  Please update the product information below
                </Typography>

                <Divider sx={{ marginBottom: "16px" }} />

                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: "8px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#1C5E20",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1C5E20",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1C5E20",
                    },
                  }}
                >
                  <TextField
                    label="Product Name"
                    {...formik.getFieldProps("name")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShoppingBagIcon sx={{ color: "#1C5E20" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: "8px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#1C5E20",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1C5E20",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1C5E20",
                    },
                  }}
                >
                  <TextField
                    label="Brand"
                    {...formik.getFieldProps("brand")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BrandIcon sx={{ color: "#1C5E20" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.brand && formik.errors.brand ? (
                    <FormHelperText error>{formik.errors.brand}</FormHelperText>
                  ) : null}
                </FormControl>

                <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <FormControl
                    sx={{
                      flex: 1,
                      minWidth: "200px",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1C5E20",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1C5E20",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#1C5E20",
                      },
                    }}
                  >
                    <TextField
                      type="number"
                      label="Price"
                      {...formik.getFieldProps("price")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon sx={{ color: "#1C5E20" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <FormHelperText error>
                        {formik.errors.price}
                      </FormHelperText>
                    ) : null}
                  </FormControl>

                  <FormControl
                    sx={{
                      flex: 1,
                      minWidth: "200px",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1C5E20",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1C5E20",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#1C5E20",
                      },
                    }}
                  >
                    <TextField
                      type="number"
                      label="Quantity"
                      {...formik.getFieldProps("quantity")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InventoryIcon sx={{ color: "#1C5E20" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <FormHelperText error>
                        {formik.errors.quantity}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Box>

                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: "8px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#1C5E20",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1C5E20",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1C5E20",
                    },
                  }}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="category"
                    {...formik.getFieldProps("category")}
                    startAdornment={
                      <InputAdornment position="start">
                        <CategoryIcon
                          sx={{ color: "#1C5E20", marginRight: "8px" }}
                        />
                      </InputAdornment>
                    }
                  >
                    {productCategoriesForDropDown.map((item) => {
                      return (
                        <MenuItem
                          key={item.id}
                          value={item.value}
                          className="capitalize"
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.category && formik.errors.category ? (
                    <FormHelperText error>
                      {formik.errors.category}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Paper
                  variant="outlined"
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "4px",
                    borderColor: "#e0e0e0",
                    "&:hover": {
                      borderColor: "#1C5E20",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <LocalShippingIcon sx={{ color: "#1C5E20" }} />
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FormLabel
                        sx={{ color: "darkgreen !important", fontWeight: 500 }}
                      >
                        Free Shipping:
                      </FormLabel>
                      <RadioGroup
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                        defaultValue={"false"}
                        {...formik.getFieldProps("freeShipping")}
                      >
                        <FormControlLabel
                          sx={{ color: "grey" }}
                          control={<Radio color="success" />}
                          value={"true"}
                          label="Yes"
                        />
                        <FormControlLabel
                          sx={{ color: "gray" }}
                          value={"false"}
                          control={<Radio color="success" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Paper>

                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: "8px",
                    marginTop: "8px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#1C5E20",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1C5E20",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1C5E20",
                    },
                  }}
                >
                  <TextField
                    label="Description"
                    multiline
                    minRows={4}
                    maxRows={8}
                    {...formik.getFieldProps("description")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: "flex-start", marginTop: "16px" }}
                        >
                          <DescriptionIcon sx={{ color: "#1C5E20" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    background: "#1C5E20",
                    padding: "12px",
                    marginTop: "16px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    boxShadow: "0 4px 6px rgba(28, 94, 32, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#164a19",
                      boxShadow: "0 6px 10px rgba(28, 94, 32, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 2px 4px rgba(28, 94, 32, 0.2)",
                    },
                  }}
                >
                  Update Product
                </Button>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
};

export default EditProductForm;
