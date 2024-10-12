import { useEffect, useState } from "react";
import axios from "axios";

import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
 
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
 
  Toolbar,

  useMediaQuery,
  useTheme,
} from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Icons
import Logo from "../../assets/images/logo.svg";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import AppsIcon from "@mui/icons-material/Apps";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import { clearPersistedUser, logoutUser } from "../../redux/Slices/userSlice";


// APIs
const LOGOUT_API = `${
  import.meta.env.VITE_BACKEND_DOMAIN_NAME
}/api/authentication/logout`;

const drawerWidth = 220;

function SideNav(props) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const state = useSelector((state) => state.Singleuser);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    axios
      .post(LOGOUT_API, {}, { withCredentials: true })
      .then((response) => {
        dispatch(clearPersistedUser());
        Cookies.remove("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isMediumScreen) {
      setMobileOpen(false);
    }
  }, [isMediumScreen]);

  const drawer = (
    <div style={{ backgroundColor: "#f3f6f9", height: "100%" }}>
      <Box
        onClick={() => {
          navigate("/");
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <img src={Logo} alt="Logo" style={{ width: "50%", height: "auto" }} />
        <p>Study Max</p>
      </Box>

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="usermanagment">
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary={"User Management"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="addproduct">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Exam"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Categories"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="addcategory">
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Subject"} />
          </ListItemButton>
        </ListItem>

       
      </List>

    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#e7edf3",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "black", mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <Button
              onClick={() => handleLogout()}
              variant="contained"
              sx={{
                color: "#00000",
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              <Box>Logout</Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f3f6f9",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          justifyContent: "center",
        }}
      >
        <Toolbar />
        <Box sx={{ width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default SideNav;
