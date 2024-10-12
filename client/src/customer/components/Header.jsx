import React, { useState, useEffect } from "react";
import "../App.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Modal,
  Fade,
  Backdrop,
  useScrollTrigger,
  Chip,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { clearPersistedUser, logoutUser } from "../../redux/Slices/userSlice";
import { fetchCartFromServer } from "../../redux/Slices/cartSlice";
import { Container } from "@mui/system";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    backgroundColor: "#f7a400", // Your desired background color
    color: "white", // Text color
    padding: "0 4px", // Adjust padding as needed
  },
}));

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Categories", path: "/categories" },
  { label: "Products", path: "/products" },
  // { label: "Login", path: "/login" },
];

const navItemsAfterLogin = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Categories", path: "/categories" },
  { label: "Products", path: "/products" },
  { label: "Dashboard", path: "/admin/dashboard" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state) => state.Singleuser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items.length);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    dispatch(clearPersistedUser());
    navigate("/");
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(fetchCartFromServer());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100); // Adjust this value to change when the effect kicks in
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getNavItems = () => {
    if (user.data?.role === "admin") return navItemsAfterLogin;
    if (user.data?.role === "user")
      return [
        ...navItemsAfterLogin.filter((item) => item.label !== "Dashboard"),
      ];
    return navItems;
  };

  const renderNavItems = (items) =>
    items.map((item) => (
      <ListItem key={item.label} disablePadding>
        <ListItemButton
          sx={{
            textAlign: "center",
            color: "black",
            width: "100%",
            border: "1px solid #0b355b",
            marginY: 1,
            paddingX: 6,
            "&:hover": {
              backgroundColor: "#0b355b",
              color: "white",
            },
            transition: "background-color 0.1s, color 0.1s",
          }}
          component={item.action ? "button" : NavLink}
          to={item.path || null}
          onClick={item.action || null}
        >
          <ListItemText
            primary={item.label}
            sx={{
              "& .MuiTypography-root": {
                textTransform: "uppercase",
                fontWeight: 600,
                fontSize: "0.9rem",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    ));
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingY: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img className="w-24 sm:mx-0 mx-auto" src={logo} alt="Logo" />
      </Typography>
      <List>{renderNavItems(getNavItems())}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexGrow: 1, overflowY: "auto" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: scrolled ? "#fff" : "transparent",
          transition: "background-color 0.3s ease",
          boxShadow: scrolled ? 4 : "none",
        }}
      >
        <Container>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingY: { xs: 1, sm: 2 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: "none" },
                  color: scrolled ? "black" : "black",
                }}
              >
                <MenuIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 600,
                  color: "black", // Adjusted to white for better contrast
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: 100, // Maximum width
                    display: { xs: "none", sm: "none", md: "block" }, // Hide on small screens and up
                    maxWidth: "100%",
                  }}
                  className="w-28"
                />
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {getNavItems().map((item) => (
                <Button
                  key={item.label}
                  component={item.action ? "button" : NavLink}
                  to={item.path || null}
                  onClick={(event) => {
                    if (item.action) {
                      item.action();
                      event.stopPropagation();
                    }
                  }}
                  sx={{
                    marginLeft: 3,
                    fontWeight: "700",
                    fontSize: "1rem",

                    color: scrolled ? "black" : "black", // White text for contrast
                    fontFamily: "'Roboto', sans-serif",
                    transition: "all 0.1s ease, transform 0.1s ease",
                    "&:hover": {
                      color: "#f9b735", // Orange hover color
                      // transform: "scale(1.05)",
                      backgroundColor: "rgba(13, 13, 13, 0.08)",
                      borderRadius: "0px",
                    },
                    "&.active": {
                      color: "#f7a400",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {user.data === null ? (
              <Typography
                onClick={() => navigate("/login")}
                sx={{
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  color: "black",
                  fontFamily: "'Roboto', sans-serif",
                  transition: "all 0.3s ease, transform 0.3s ease",
                  cursor: "pointer",
                  border: "2px solid black", // Orange border for contrast
                  paddingX: 2,
                  paddingY: 1,
                  // borderRadius: "3px",
                  "&:hover": {
                    color: "#fff", // Match background color
                    backgroundColor: "#0b355b", // Orange background on hover
                    borderColor: "#0b355b",
                  },
                }}
              >
                Login
              </Typography>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                <IconButton
                  component={NavLink}
                  to="/cart"
                  sx={{ color: "#f7a400" }}
                >
                  <StyledBadge badgeContent={cartItems} color="error">
                    <ShoppingCartIcon sx={{ color: "#f7a400" }} />
                  </StyledBadge>
                </IconButton>

                <IconButton
                  edge="end"
                  color="inherit"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <Tooltip title={user?.data?.username}>
                    <IconButton onClick={handleMenuOpen}>
                      <AccountCircleIcon
                        sx={{ fontSize: "1.8rem", color: "#333" }}
                      />
                    </IconButton>
                  </Tooltip>
                </IconButton>

                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
