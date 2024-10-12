import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";

const ProductCardMain = styled(Card)({
  position: "relative",
  width: "100%",

  height: "30vh",
  overflow: "hidden",
  borderRadius: 3,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.03)",
    "& .details": {
      opacity: 0,
    },
    "& .viewButton": {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1)",
    },
  },
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const DetailsContainer = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  background: "rgba(174, 185, 191, 0.2)",
  backdropFilter: "blur(5px)",
  padding: "8px",
  transition: "opacity 0.3s ease",
  opacity: 1,
  "&:hover": {
    opacity: 0,
  },
});

const ProductTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.1rem",
  lineHeight: "1.3",
  marginBottom: 4,
});

const ProductPrice = styled(Typography)({
  fontWeight: 600,
  fontSize: "0.9rem",
  lineHeight: "1",
  color: "#96031A",
});

const ViewButton = styled(Button)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0)",
  opacity: 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  zIndex: 2,
  backgroundColor: "#5d737e",
  color: "#fff",
  border: "none",
  borderRadius: 20,
  padding: "6px 20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#8e9da5",
  },
});

const ProductImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  filter: "blur(0)",
  transition: "transform 0.3s ease",
});

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const forNavigate = () => {
    navigate(`/admin/productdetails/${product._id}`);
  };

  return (
    <ProductCardMain>
      <ImageContainer className="w-[10rem]">
        <ProductImage
          component="img"
          image={product?.thumbnail?.[0]?.url}
          alt={product.name}
        />
        <DetailsContainer className="details">
          <ProductTitle variant="h6">{product.name}</ProductTitle>
          <ProductPrice variant="body1">
            Rs: {product.sizes?.[0].size_price}
          </ProductPrice>
        </DetailsContainer>
        <ViewButton
          onClick={forNavigate}
          className="viewButton"
          variant="contained"
        >
          <VisibilityIcon style={{ marginRight: 8 }} />
          View
        </ViewButton>
      </ImageContainer>
    </ProductCardMain>
  );
};

export default ProductCard;
