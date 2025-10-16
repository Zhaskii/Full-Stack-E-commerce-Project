import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";

// Match the navbar theme
const THEME = {
  primary: "#1C5E20",
  secondary: "#0F4C12", // Darker shade for the copyright section
  text: "#ffffff",
  hover: "rgba(255, 255, 255, 0.8)",
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ width: "100%" }}>
      <Box
        sx={{ bgcolor: THEME.primary, color: THEME.text, py: { xs: 4, md: 6 } }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 4, md: 6 } }}
          >
            <Box sx={{ width: { xs: "100%", md: "30%", lg: "25%" } }}>
              <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <WorkspacePremiumSharpIcon
                  sx={{
                    fontSize: 40,
                    mr: 1.5,
                    color: THEME.text,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Company
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 2, opacity: 0.8, maxWidth: "90%" }}
              >
                We provide high-quality products and services to our customers
                with a commitment to excellence and sustainability.
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">contact@company.com</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Link
                  href="#"
                  aria-label="Facebook"
                  sx={{
                    color: THEME.text,
                    transition: "transform 0.2s, opacity 0.2s",
                    "&:hover": {
                      opacity: 0.8,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  sx={{
                    color: THEME.text,
                    transition: "transform 0.2s, opacity 0.2s",
                    "&:hover": {
                      opacity: 0.8,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  sx={{
                    color: THEME.text,
                    transition: "transform 0.2s, opacity 0.2s",
                    "&:hover": {
                      opacity: 0.8,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </Link>
              </Stack>
            </Box>

            <Box sx={{ width: { xs: "45%", sm: "30%", md: "15%", lg: "20%" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    bgcolor: THEME.text,
                  },
                }}
              >
                Navigation
              </Typography>
              <Stack spacing={2}>
                {[
                  {
                    name: "Home",
                    icon: <HomeIcon fontSize="small" sx={{ fontSize: 16 }} />,
                  },
                  {
                    name: "About",
                    icon: <InfoIcon fontSize="small" sx={{ fontSize: 16 }} />,
                  },
                  {
                    name: "Services",
                    icon: (
                      <CreditCardIcon fontSize="small" sx={{ fontSize: 16 }} />
                    ),
                  },
                  {
                    name: "Contact",
                    icon: <EmailIcon fontSize="small" sx={{ fontSize: 16 }} />,
                  },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    underline="none"
                    sx={{
                      color: THEME.text,
                      opacity: 0.8,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      transition: "opacity 0.2s, transform 0.2s",
                      "&:hover": {
                        opacity: 1,
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    {item.icon}
                    <Typography variant="body2">{item.name}</Typography>
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box sx={{ width: { xs: "45%", sm: "30%", md: "25%", lg: "20%" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    bgcolor: THEME.text,
                  },
                }}
              >
                Legal
              </Typography>
              <Stack spacing={2}>
                {[
                  "Privacy Policy",
                  "Terms and Conditions",
                  "Cookie Policy",
                  "Written Policy",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    underline="none"
                    sx={{
                      color: THEME.text,
                      opacity: 0.8,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      transition: "opacity 0.2s, transform 0.2s",
                      "&:hover": {
                        opacity: 1,
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <SecurityIcon fontSize="small" sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{ width: { xs: "100%", sm: "30%", md: "25%", lg: "25%" } }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 2,
                    bgcolor: THEME.text,
                  },
                }}
              >
                Payment Methods
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                {["PayPal", "Esewa", "Khalti", "Visa", "Mastercard"].map(
                  (method) => (
                    <Box
                      key={method}
                      sx={{
                        width: "calc(50% - 8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                        py: 1,
                        px: 2,
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.2)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {method}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
                We accept multiple payment methods for your convenience
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", m: 0 }} />

      <Box sx={{ bgcolor: THEME.secondary, color: THEME.text, py: 2 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, textAlign: { xs: "center", md: "left" } }}
            >
              &copy; {currentYear} Company Name. All Rights Reserved.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                textAlign: { xs: "center", md: "right" },
                mt: { xs: 1, md: 0 },
              }}
            >
              Designed with ❤️ by Kunal Shrestha
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
