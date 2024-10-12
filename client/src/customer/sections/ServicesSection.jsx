import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import RocketIcon from "@mui/icons-material/Rocket";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useSelector } from "react-redux";

const ServicesSection = () => {
  const user = useSelector((state) => state.Singleuser);
  const services = [
    {
      icon: <RocketIcon sx={{ fontSize: 50, color: "#BD3D39" }} />,
      title: "Fast Delivery",
      description: "Experience Lightning-fast delivery.",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 50, color: "#0B355B" }} />,
      title: "Cash on Delivery",
      description: "Order now and pay after getting your product.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 50 }} />,
      title: "Technical Support",
      description: "We are here to help you.",
    },
  ];

  return (
    user.data?.role === "admin"  ?"" :(
      <Box
        component="section"
        className="shop-services section home"
        sx={{ padding: "60px 0", backgroundColor: "#f5f5f5" }}
      >
        <Container maxWidth={"lg"}>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  className="service"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box className="service-icon" sx={{ marginBottom: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    className="archive"
                    sx={{
                      marginBottom: 1,
                      color: "#454545",
                      lineHeight: "10px",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "500", color: "#a1a1a1" }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default ServicesSection;
