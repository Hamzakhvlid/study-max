import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Marquee from "react-fast-marquee";


const CoorporationPartners = () => {
  return (
    <>
      <Box sx={{ width: "100%", py: "70px" }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            className="archive text-center text-[#bd3d39] sm:my-12 md:my-14"
            sx={{
              fontSize: {
                lg: "2.3rem",
                md: "2.2rem",
                sm: "1.9rem",
                xs: "1.8rem",
              },
            }}
          >
            Coorporation Partners
          </Typography>
        </Box>
        <Marquee autoFill={true} gradient={true}>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            first slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            second slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            third slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            fourth slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>five slide</div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            first slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            second slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            third slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>
            fourth slide
          </div>
          <div style={{ padding: "20px", marginRight: "20px" }}>five slide</div>
        </Marquee>
      </Box>
    </>
  
  );
};

export default CoorporationPartners;
