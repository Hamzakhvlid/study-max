import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CEO from "./../../assets/images/CEO.jpg";
import Ali from "./../../assets/images/1.jpg";
import Umer from "./../../assets/images/2.jpg";
import bahi from "./../../assets/images/4.jpg";
import Qualitycontrol from "../../assets/images/22.jpg";
import ServicesSection from "../sections/ServicesSection";
// import CEO from "./../../assets/images/CEO.jpg";

function About() {
  const managers = [
    {
      name: "Muhammad Naghman",
      title: "Manager Export",
      image: bahi,
    },
    {
      name: "Ali Suleman",
      title: "General Manager",
      image: Ali,
    },
    {
      name: "Umair Suleman",
      title: "Senior Engineering Manager",
      image: Umer,
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 9 }}>
        {/* Hero Section */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            py: { xs: 6, md: 12 },
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { md: "space-between" },
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
            backgroundColor: "#f5f5f5",
            borderRadius: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Text Content */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              px: { xs: 2, md: 4 },
              py: { xs: 4, md: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "6vw", md: "3vw" },
                  fontFamily: "Raleway, sans-serif",
                  color: "#333",
                }}
              >
                Meet Our <strong style={{ color: "#f7a400" }}>CEO</strong>{" "}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>
                Muhammad Suleman Mirza
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: { xs: "4vw", md: "1.3vw" },
                  color: "#666",
                  mb: 3,
                }}
              >
                Our CEO's relentless dedication has propelled our fan company to
                new heights, delivering innovation with every product. Through
                hard work and visionary leadership, they've built a trusted
                brand known for quality and performance.
              </Typography>
            </motion.div>
          </Box>

          {/* Placeholder Image */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              mx: "auto",
              position: "relative",
            }}
          >
            <motion.img
              src={CEO}
              alt="Product Image"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "50%",
                border: "3px solid #cccccc",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            padding: "80px 20px",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "50px",
              color: "#333",
              fontSize: "2.5rem",
            }}
          >
            Our Team
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {managers.map((manager, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      alt={manager.name}
                      src={manager.image}
                      sx={{
                        width: 220,
                        height: 220,
                        borderRadius: "50%",
                        margin: "0 auto",
                        marginBottom: "20px",
                        border: "3px solid #fff",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "10px",
                      }}
                    >
                      {manager.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        color: "#777",
                        fontSize: "1rem",
                      }}
                    >
                      {manager.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            py: { xs: 6, md: 12 },
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { md: "space-between" },
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
            backgroundColor: "#f5f5f5",
            borderRadius: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              mx: "auto",
              position: "relative",
            }}
          >
            <motion.img
              src={Qualitycontrol}
              alt="Product Image"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "50%",
                border: "3px solid #cccccc",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </Box>

          {/* Text Content */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              px: { xs: 2, md: 4 },
              py: { xs: 4, md: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "6vw", md: "2.5vw" },
                  fontFamily: "Raleway, sans-serif",
                  color: "#333",
                }}
              >
                <strong style={{ color: "#f7a400" }}>Manager</strong> Quality
                Control
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>
                Muhammad idrees
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: { xs: "4vw", md: "1.3vw" },
                  color: "#666",
                  mb: 3,
                }}
              >
                Our Quality Control Manager ensures that every product meets the
                highest standards of excellence. With meticulous attention to
                detail, they oversee every step of the process to guarantee
                customer satisfaction
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Container>
      <ServicesSection/>
    </>
  );
}

export default About;
