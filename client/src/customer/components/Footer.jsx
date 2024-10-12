import React from "react";
import { Box, Grid, Typography, Link, Container } from "@mui/material";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { img1 } from "../imports";
import { useNavigate } from "react-router-dom";
const Footer = () => {

  const navigate = useNavigate()
  return (
    <footer className="footer">
      {/* Footer Top */}
      <Container>
        <Box className="footer-top section" py={8} color="white">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={5}>
              {/* Single Widget */}
              <Box className="single-footer about">
                <Box className="logo">
                  <Link href="index.html">
                    <img src={img1} style={{ height: "45px" }} alt="#" />
                  </Link>
                </Box>
                <Typography className="text" variant="body2" mt={2}>
                  Since its establishement in 1975, Al Noor FansTM is recognized
                  as a symbol of Quality & Excellence in the National market. We
                  are an ISO 9001:2008 certified company with all our production
                  processes benchmarked as per the highest International
                  Standards.
                </Typography>
                <Typography className="call" variant="body2" mt={2}>
                  Got Question? Call us 24/7
                  <span>
                    <Typography
                      sx={{
                        color: "#F7A400",
                        marginTop: 1,
                        fontWeight: "600",
                      }}
                    >
                      +92 053 3530447 / +92 053 3011954
                    </Typography>
                  </span>
                </Typography>
              </Box>
              {/* End Single Widget */}
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              {/* Single Widget */}
              <Box className="single-footer links">
                <Typography
                  sx={{
                    color: "#F7A400",
                    fontSize: "1.6rem",
                    fontWeight: "500",
                  }}
                  mb={2}
                >
                  Information
                </Typography>
                <ul>
                  <li onClick={() => navigate("/about")}>About Us</li>
                  <li onClick={() => navigate("/term")}>Terms & Conditions</li>
                  <li onClick={() => navigate("/contact")}>Contact Us</li>
                  <li onClick={() => navigate("/contact")}>Help</li>
                </ul>
              </Box>
              {/* End Single Widget */}
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              {/* Single Widget */}
              <Box className="single-footer links">
                <Typography
                  sx={{
                    color: "#F7A400",
                    fontSize: "1.6rem",
                    fontWeight: "500",
                  }}
                  mb={2}
                >
                  Our Products
                </Typography>
                <ul onClick={() => navigate("/categories")}>
                  <li>Ceiling Fans</li>
                  <li>Padestal Fans</li>

                  <li>Exhaust Fans</li>
                  <li>Washing Machine</li>
                  <li>Skimming Machine</li>
                </ul>
              </Box>
              {/* End Single Widget */}
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              {/* Single Widget */}
              <Box className="single-footer social">
                <Typography
                  sx={{
                    color: "#F7A400",
                    fontSize: "1.6rem",
                    fontWeight: "500",
                  }}
                  mb={2}
                >
                  Contact Us
                </Typography>
                <Box className="contact">
                  <ul>
                    <li>75-B. S l, E. G. T. Road</li>
                    <li>Gujrat, Pakistan.</li>
                    <li>info@alnoorfans.com</li>
                    <li>+92 345 6333393</li>
                  </ul>
                </Box>
                <ul className="social-links" style={{ marginTop: "20px" }}>
                  <li>
                    <Link href="#">
                      <FacebookIcon />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <TwitterIcon />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <XIcon />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <InstagramIcon />
                    </Link>
                  </li>
                </ul>
              </Box>
              {/* End Single Widget */}
            </Grid>
          </Grid>
        </Box>
        {/* End Footer Top */}
      </Container>
      <Box className="copyright" py={2} bgcolor="#082540">
        <Container maxWidth={"lg"}>
          <Grid container textAlign="center">
            <Grid item xs={12}>
              <Box className="left">
                <Typography variant="body2" color="inherit">
                  Copyright © 2024 Al-Noor Fans<sup>TM</sup>
                  <Link target="_blank" color="inherit"></Link> - All Rights
                  Reserved. Developed by Vision Bird Technologies
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
