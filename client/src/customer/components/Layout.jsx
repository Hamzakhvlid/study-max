import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default Layout;
