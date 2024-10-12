import React from "react";
import { img2, img3, img4, img5, img6 } from "../imports";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          paddingTop: 10,
          paddingBottom: 12,
        }}
      >
        <Container maxWidth={"lg"}>
          <Box>
            <Typography
              className="archive text-center text-[#0B355B] sm:my-12 md:my-14 pb-12"
              sx={{
                fontSize: {
                  lg: "2.3rem",
                  md: "2.2rem",
                  sm: "1.9rem",
                  xs: "1.8rem",
                },
              }}
            >
              Product Categories
            </Typography>
          </Box>
          <div onClick={() => navigate("/categories")} className="">
            <span className="flex categories-img">
              <img src={img2} alt="" className="w-1/3 h-auto object-cover" />
              <img src={img3} alt="" className="w-1/3 h-auto object-cover" />
              <img src={img4} alt="" className="w-1/3 h-auto object-cover" />
            </span>
            <span className="flex categories-img">
              <img src={img5} alt="" className="w-1/2 h-auto object-cover" />
              <img src={img6} alt="" className="w-1/2 h-auto object-cover" />
            </span>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default ProductCategories;
