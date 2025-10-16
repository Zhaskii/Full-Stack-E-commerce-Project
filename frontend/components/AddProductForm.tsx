"use client";
import { productCategoriesForDropDown } from "@/constant/general.constant";
import type React from "react";

import type { IAddProductResponse } from "@/interface/add.product.interface";
import type { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import { productSchema } from "@/validation-schema/add.product.schema";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

// Icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DescriptionIcon from "@mui/icons-material/Description";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Type definitions for our form
export interface IProductRoot {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image?: string;
}

export interface IAddProductForm extends IProductRoot {
  freeShipping: string;
}

export interface IProductData extends IProductRoot {
  freeShipping: boolean;
}

const AddProductForm = () => {
  const router = useRouter();

  // State for image handling
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Colors for our theme
  const primaryColor = "#1C5E20";

  // Mutation hook for submitting the form
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values: IProductData) => {
      return await axiosInstance.post("/product/add", values);
    },
    onSuccess: (res: IAddProductResponse) => {
      toast.success(res.data.message);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  // Function to upload image to Cloudinary
  const handleImageUploadToCloudinary = async (image: File) => {
    try {
      const cloud_name = "dl0bd4lbf";
      const upload_preset = "Project2025";

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", upload_preset);

      setImageLoading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      const url = res.data.secure_url;
      toast.success("Image uploaded successfully");
      return url;
    } catch (error) {
      console.log(error);
      toast.error("Upload failed. Please try again.");
      return undefined;
    } finally {
      setImageLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size should be less than 5MB");
          return;
        }
        setLocalUrl(URL.createObjectURL(file));
        setImage(file);
      } else {
        toast.error("Please upload an image file (JPG, PNG, etc.)");
      }
    }
  };

  // Handle file selection from the file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setLocalUrl(URL.createObjectURL(file));
    setImage(file);
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setLocalUrl(null);
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Loading indicator */}
      {(isPending || imageLoading) && (
        <Box
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
        >
          <LinearProgress color="success" />
        </Box>
      )}

      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: 0,
          quantity: 1,
          category: "",
          freeShipping: "false",
          description: "",
        }}
        validationSchema={productSchema}
        onSubmit={async (values: IAddProductForm) => {
          // Convert string "true"/"false" to boolean
          const newProduct = {
            ...values,
            freeShipping: values.freeShipping === "true",
          };

          // Upload image if one is selected
          let imageUrl: string | undefined = undefined;
          if (image) {
            imageUrl = await handleImageUploadToCloudinary(image);
          }

          // Submit the form data
          mutate({ ...newProduct, image: imageUrl || undefined });
        }}
      >
        {(formik) => {
          return (
            <Card
              elevation={3}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <Box
                sx={{
                  bgcolor: primaryColor,
                  py: 2,
                  px: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AddCircleOutlineIcon sx={{ color: "white" }} />
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  Add Product
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Image Upload Area */}
                  <Box sx={{ width: "100%", mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: primaryColor,
                      }}
                    >
                      Product Image
                    </Typography>

                    {/* Drag and drop area */}
                    <Paper
                      elevation={2}
                      sx={{
                        width: "100%",
                        height: localUrl ? "auto" : "200px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "relative",
                        border: "2px dashed",
                        borderColor: isDragging ? primaryColor : "#ccc",
                        bgcolor: isDragging ? "#f0f7f0" : "#f9f9f9",
                        cursor: "pointer",
                      }}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imageLoading ? (
                        // Loading state
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "200px",
                          }}
                        >
                          <LinearProgress
                            color="success"
                            sx={{ width: "50%", mb: 2 }}
                          />
                          <Typography>Uploading image...</Typography>
                        </Box>
                      ) : localUrl ? (
                        // Image preview
                        <Box sx={{ position: "relative" }}>
                          <Image
                            src={localUrl || "/placeholder.svg"}
                            alt="Product Preview"
                            width={800}
                            height={450}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "auto",
                              maxHeight: "300px",
                              display: "block",
                            }}
                          />
                          {/* Delete button */}
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              zIndex: 2,
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      ) : (
                        // Empty state
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            p: 3,
                            color: "#666",
                          }}
                        >
                          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Drag & Drop Product Image
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "center",
                              mt: 1,
                              mb: 2,
                              color: "#777",
                            }}
                          >
                            or click to browse files
                          </Typography>
                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ mt: 1 }}
                          >
                            Browse Images
                          </Button>
                        </Box>
                      )}
                    </Paper>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />

                    <Typography
                      variant="caption"
                      sx={{ display: "block", mt: 1, color: "#666" }}
                    >
                      {localUrl
                        ? "Click the image to change it or use the remove button"
                        : "Recommended: High-quality JPG, PNG or WebP image (max 5MB)"}
                    </Typography>
                  </Box>

                  {/* Form fields - using a grid for responsive layout */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    {/* Name field */}
                    <FormControl fullWidth>
                      <TextField
                        label="Name"
                        {...formik.getFieldProps("name")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DriveFileRenameOutlineIcon color="success" />
                            </InputAdornment>
                          ),
                        }}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </FormControl>

                    {/* Brand field */}
                    <FormControl fullWidth>
                      <TextField
                        label="Brand"
                        {...formik.getFieldProps("brand")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BrandingWatermarkIcon color="success" />
                            </InputAdornment>
                          ),
                        }}
                        error={
                          formik.touched.brand && Boolean(formik.errors.brand)
                        }
                        helperText={formik.touched.brand && formik.errors.brand}
                      />
                    </FormControl>

                    {/* Price field */}
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Price"
                        inputProps={{
                          min: 0,
                        }}
                        {...formik.getFieldProps("price")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyIcon color="success" />
                            </InputAdornment>
                          ),
                        }}
                        error={
                          formik.touched.price && Boolean(formik.errors.price)
                        }
                        helperText={formik.touched.price && formik.errors.price}
                      />
                    </FormControl>

                    {/* Quantity field */}
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Quantity"
                        inputProps={{
                          min: 1,
                        }}
                        {...formik.getFieldProps("quantity")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InventoryIcon color="success" />
                            </InputAdornment>
                          ),
                        }}
                        error={
                          formik.touched.quantity &&
                          Boolean(formik.errors.quantity)
                        }
                        helperText={
                          formik.touched.quantity && formik.errors.quantity
                        }
                      />
                    </FormControl>

                    {/* Category dropdown */}
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        label="Category"
                        {...formik.getFieldProps("category")}
                        error={
                          formik.touched.category &&
                          Boolean(formik.errors.category)
                        }
                        startAdornment={
                          <CategoryIcon
                            color="success"
                            sx={{ ml: 1, mr: -0.5 }}
                          />
                        }
                      >
                        {productCategoriesForDropDown.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.value}
                            className="capitalize"
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.category && formik.errors.category && (
                        <FormHelperText error>
                          {formik.errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>

                    {/* Free shipping radio buttons */}
                    <FormControl
                      fullWidth
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        p: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShippingIcon color="success" sx={{ mr: 1 }} />
                        <FormLabel sx={{ color: "text.primary", m: 0 }}>
                          Free Shipping:{" "}
                        </FormLabel>
                      </Box>
                      <RadioGroup
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                        defaultValue={"false"}
                        {...formik.getFieldProps("freeShipping")}
                      >
                        <FormControlLabel
                          control={<Radio color="success" />}
                          value={"true"}
                          label="Yes"
                          sx={{ mr: 3 }}
                        />
                        <FormControlLabel
                          value={"false"}
                          control={<Radio color="success" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  {/* Description field - full width */}
                  <FormControl fullWidth sx={{ mt: 2 }}>
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
                            sx={{ alignSelf: "flex-start", mt: 1.5 }}
                          >
                            <DescriptionIcon color="success" />
                          </InputAdornment>
                        ),
                      }}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </FormControl>

                  {/* Form buttons */}
                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      color="inherit"
                      onClick={() => router.back()}
                      sx={{
                        flex: 1,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="success"
                      disabled={isPending || imageLoading}
                      startIcon={<AddCircleOutlineIcon />}
                      sx={{
                        flex: 2,
                        py: 1.5,
                        bgcolor: primaryColor,
                      }}
                    >
                      {isPending || imageLoading
                        ? "Processing..."
                        : "Add Product"}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddProductForm;
