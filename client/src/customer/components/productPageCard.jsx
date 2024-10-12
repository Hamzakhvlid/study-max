import React, { useState } from "react";
import { Grid, Box, Typography, IconButton, Skeleton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/Slices/singleProductSlice";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = `${product?.thumbnail?.[0]?.url}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: "relative",
            marginTop: "30px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ position: "absolute", top: 0, left: 0 }}
            />
          )}
          <img
            loading="lazy"
            src={imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
          <Box
            onClick={() => {
              navigate(`/products/product/${product._id}`);
              dispatch(fetchSingleProduct({ id: product._id }));
            }}
            className="overlay-box"
            sx={{
              position: "absolute",
              top: "0",
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              transition: "opacity 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                sx={{
                  fontSize: 40,
                  color: "#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box paddingY={"15px"} textAlign="center">
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "#4d4d4d",
              lineHeight: "1.4",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              display: "block",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: "500",
              color: "#842b28",
              textTransform: "uppercase",
              borderBottom: "2px solid #842b28",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Rs {product.sizes[0].size_price}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default ProductCard;
