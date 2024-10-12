import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ProductPageCard from "../components/productPageCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Slices/productsSlice";
import Loading from "../../Admin/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.products);
  

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (isLoading)
    return (
      <div
        style={{
          height: "50vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );

  if (isError) return <div>Error Fetching Featured Products</div>;

  return (
    <Container maxWidth={"lg"} sx={{ marginY: 10 }}>
      <Typography
        className="archive text-center text-[#bd3d39] sm:my-12 md:my-14"
        sx={{
          fontSize: { lg: "2.3rem", md: "2.2rem", sm: "1.9rem", xs: "1.8rem" },
        }}
      >
        Featured Products
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {products && products.length > 0 ? (
          products
            .slice(0, 3)
            .map((product) => (
              <ProductPageCard key={product._id} product={product} />
            ))
        ) : (
          <Typography sx={{ fontWeight: "600", marginTop: "30px" }}>
            No Products Added
          </Typography>
        )}
      </Grid>

      <Box sx={{ textAlign: "center", my: 7 }}>
        {products && products.length > 0 ? (
          <Button
          variant="contained"
            onClick={() => navigate("/products")}
            sx={{
              backgroundColor: "#BD3D39",
              paddingX: 4,
              border: "2px solid transparent",
              transition: "all 0.5s ease",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              "&:hover": {
                backgroundColor: "#fff",
                border: "2px solid #ca6461",
                color: "#ca6461",
                fontWeight: "600",
                transition: "all 0.5s ease",
              },
            }}
          >
            Explore All
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
};

export default FeatureProducts;