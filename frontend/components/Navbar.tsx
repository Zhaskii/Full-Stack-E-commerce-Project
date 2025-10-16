"use client";
import { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const THEME = {
  primary: "#1C5E20",
  text: "#ffffff",
  hover: "rgba(255, 255, 255, 0.12)",
  border: "rgba(255, 255, 255, 0.23)",
  highlight: "#2E7D32",
};

const navItems = [
  { text: "Home", id: "/" },
  { text: "About", id: "/about" },
  { text: "Contact", id: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(window.localStorage.getItem("role") as string);
  }, []);

  const goToCart = () => {
    router.push("/cart");
  };

  const handleNavigation = (path: any) => {
    router.push(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    router.replace("/login");
  };

  const { isPending, data, isError, error } = useQuery<number, IError>({
    queryKey: ["cart-item-count"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/item/count");
      return res.data.totalCartItem;
    },
    enabled: userRole === "buyer",
  });

  const buttonStyles = {
    color: THEME.text,
    borderColor: THEME.border,
    textTransform: "none",
    fontWeight: 500,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: THEME.text,
      backgroundColor: THEME.highlight,
      transform: "translateY(-2px)",
    },
  };

  const logoStyles = {
    fontWeight: 700,
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.9,
    },
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: THEME.primary,
        color: THEME.text,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.5,
          borderBottom: `1px solid ${THEME.hover}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/")}
        >
          <WorkspacePremiumSharpIcon
            sx={{
              fontSize: 36,
              mr: 1.5,
              color: THEME.text,
            }}
          />
          <Typography variant="h6" sx={logoStyles}>
            Company
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          sx={{
            transition: "transform 0.2s",
            "&:hover": { transform: "rotate(90deg)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.id)}
              sx={{
                py: 1.5,
                px: 3,
                transition: "all 0.2s",
                position: "relative",
                "&:hover": {
                  backgroundColor: THEME.highlight,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  width: 0,
                  height: 2,
                  backgroundColor: THEME.text,
                  transition: "all 0.3s ease",
                  transform: "translateX(-50%)",
                },
                "&:hover::after": {
                  width: "70%",
                },
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            ...buttonStyles,
            py: 1.5,
            fontSize: "1rem",
            boxShadow: `0 0 10px rgba(0,0,0,0.1)`,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: THEME.primary,
        color: THEME.text,
        borderBottom: `1px solid ${THEME.hover}`,
        padding: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            height: { xs: 64, md: 72 },
          }}
        >
          <Box
            onClick={() => handleNavigation("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              transition: "opacity 0.2s",
              cursor: "pointer",
              "&:hover": { opacity: 0.9 },
            }}
          >
            <WorkspacePremiumSharpIcon
              sx={{
                fontSize: { xs: 36, md: 48 },
                mr: 1.5,
                display: { xs: "none", md: "block" },
                color: THEME.text,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                ...logoStyles,
                display: { xs: "none", md: "flex" },
              }}
            >
              Company
            </Typography>
          </Box>

          {isMobile && (
            <Box
              onClick={() => handleNavigation("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                flexGrow: 1,
                cursor: "pointer",
              }}
            >
              <WorkspacePremiumSharpIcon
                sx={{
                  fontSize: 36,
                  mr: 1.5,
                  color: THEME.text,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  ...logoStyles,
                }}
              >
                Company
              </Typography>
            </Box>
          )}

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {userRole === "buyer" && (
                <Badge badgeContent={data} color="success">
                  <Tooltip title="Shopping Cart">
                    <IconButton
                      color="inherit"
                      onClick={goToCart}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          bgcolor: THEME.highlight,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Badge>
              )}

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  "& > button": {
                    position: "relative",
                    "&:hover": {
                      backgroundColor: THEME.highlight,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: 0,
                      height: 2,
                      backgroundColor: THEME.text,
                      transition: "all 0.3s ease",
                      transform: "translateX(-50%)",
                    },
                    "&:hover::after": {
                      width: "70%",
                    },
                  },
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    color="inherit"
                    onClick={() => handleNavigation(item.id)}
                    sx={{
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      transition: "all 0.2s",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {userRole === "buyer" && (
                <Badge badgeContent={data} color="success">
                  <Tooltip title="Shopping Cart">
                    <IconButton
                      color="inherit"
                      onClick={goToCart}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          bgcolor: THEME.highlight,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Badge>
              )}

              <Button
                variant="outlined"
                sx={{
                  ...buttonStyles,
                  ml: 2,
                  px: 3,
                  py: 0.8,
                  borderRadius: 2,
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "100%", sm: 320 },
            bgcolor: THEME.primary,
            boxShadow: "-5px 0 15px rgba(0,0,0,0.15)",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
