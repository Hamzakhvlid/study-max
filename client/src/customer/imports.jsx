import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BasicTable from "./sections/Table";
import "./App.css";
import img1 from "./images/logo.png";
import img2 from "./images/green.png";
import img3 from "./images/red.png";
import img4 from "./images/blue.png";
import img5 from "./images/dark blue.png";
import img6 from "./images/yellow.png";
import img7 from "./images/product.png";
import img8 from "./images/product2.png";
import img9 from "./images/product3.png";
import fan from "./images/fan.png";
import fan1 from "./images/fan1.jpg";
import faan2 from "./images/faan2.avif";
import faan3 from "./images/faan3.jpg";
import faan1 from "./images/faan1.jpg";
import main_1 from "./images/Banner1/main-1.jpg";
import main_2 from "./images/Banner2/Banner2.png";
import main_3 from "./images/Banner3/banner3.jpg";
import poster1 from "./images/poster1.jpg";
import factory from "./images/factory.webp";
import focus from "./images/focus.jpg";
import listIcon from "./images/list-icon.svg";
import { FaTruck, FaHeart, FaEye } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

<script
  src="https://kit.fontawesome.com/0e8abc1f91.js"
  crossorigin="anonymous"
></script>;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Splide.js
export { Splide } from "@splidejs/react-splide";
export { SplideSlide } from "@splidejs/react-splide";

// BasicTable.js
export { default as BasicTable } from "./sections/Table";

// Images
export { default as img1 } from "./images/logo.png";
export { default as img2 } from "./images/green.png";
export { default as img3 } from "./images/red.png";
export { default as img4 } from "./images/blue.png";
export { default as img5 } from "./images/dark blue.png";
export { default as img6 } from "./images/yellow.png";
export { default as img7 } from "./images/product.png";
export { default as img8 } from "./images/product2.png";
export { default as img9 } from "./images/product3.png";
export { default as cart } from "./images/cart.png";
export { default as heart } from "./images/h.png";
export { default as whatsapp } from "./images/w.png";
export { default as logo } from "./images/logo.png";
export { default as fan } from "./images/fan.png";
export { default as factory } from "./images/factory.webp";
export { default as focus } from "./images/focus.jpg";
export { default as listIcon } from "./images/list-icon.svg";
export { default as fan1 } from "./images/fan1.jpg";
export { default as poster1 } from "./images/poster1.jpg";
export { default as faan1 } from "./images/faan1.jpg";
export { default as faan2 } from "./images/faan2.avif";
export { default as faan3 } from "./images/faan3.jpg";
export { default as main_1 } from "./images/Banner1/main-1.jpg";
export { default as main_2 } from "./images/Banner2/Banner2.png";
export { default as main_3 } from "./images/Banner3/banner3.jpg";

// Icons
export { FaTruck, FaHeart, FaEye } from "react-icons/fa";
export { TbMoneybag } from "react-icons/tb";
export { FaHeadset } from "react-icons/fa";
export { RiLinkedinFill } from "react-icons/ri";
export { FaXTwitter } from "react-icons/fa6";
export { FaFacebookF } from "react-icons/fa6";
export { FaInstagramSquare } from "react-icons/fa";
export { BsYoutube } from "react-icons/bs";
export { FaLocationDot } from "react-icons/fa6";
export { FaPhoneVolume } from "react-icons/fa6";
export { FaWhatsapp } from "react-icons/fa";
export { FaEnvelopeOpenText } from "react-icons/fa";
export { FaSearch } from "react-icons/fa";

// Material UI
export { Typography } from "@mui/material";
export { default as AppBar } from "@mui/material/AppBar";
export { default as Box } from "@mui/material/Box";
export { default as CssBaseline } from "@mui/material/CssBaseline";
export { default as IconButton } from "@mui/material/IconButton";
export { default as Toolbar } from "@mui/material/Toolbar";
export { default as Button } from "@mui/material/Button";
export { default as MenuIcon } from "@mui/icons-material/Menu";
export { default as Drawer } from "@mui/material/Drawer";
export { default as List } from "@mui/material/List";
export { default as ListItem } from "@mui/material/ListItem";
export { default as ListItemButton } from "@mui/material/ListItemButton";
export { default as ListItemText } from "@mui/material/ListItemText";

// React
export { default as React } from "react";
export { useState } from "react";
export { NavLink } from "react-router-dom";
