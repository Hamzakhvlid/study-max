import { Box, Grid, Container } from "@mui/material";
import React from "react";

const QualitySection = () => {
  const cardData = [
    { title1: "Energy", title2: "Saver Technology" },
    { title1: "99.99% Pure", title2: "Copper Wiver" },
    { title1: "RANGE OF", title2: "Quality Products" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {" "}
      {/* Add padding to ensure spacing */}
      <Grid container spacing={4}>
        {" "}
        {/* Adjusted spacing */}
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            {" "}
            {/* Added a key prop */}
            <Box
              className="flex justify-between items-center flex-col py-8 rounded-md"
              sx={{
                backgroundColor: "#0b355b",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                transition: "transform 0.5s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Slightly scale on hover
                  boxShadow:
                    "rgba(0, 0, 0, 0.35) 0px 20px 40px, rgba(0, 0, 0, 0.30) 0px 15px 20px",
                  h2: {
                    animation: "giggle 0.5s ease",
                  },
                  p: {
                    animation: "giggle 0.5s ease",
                  },
                },
              }}
            >
              <h2
                className="archive text-2xl text-white"
                style={{ transition: "transform 0.5s ease" }}
              >
                {card.title1}
              </h2>
              <p
                className="yellow oregano text-4xl -mt-5"
                style={{ transition: "transform 0.5s ease" }}
              >
                {card.title2}
              </p>
            </Box>
            <style jsx global>{`
              @keyframes giggle {
                0% {
                  transform: rotate(0deg);
                }
                25% {
                  transform: rotate(5deg);
                }
                50% {
                  transform: rotate(-5deg);
                }
                75% {
                  transform: rotate(3deg);
                }
                100% {
                  transform: rotate(0deg);
                }
              }
            `}</style>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QualitySection;
