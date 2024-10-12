import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionSummary from "@mui/material/AccordionSummary";
import "../../../index.css";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Build from "@mui/icons-material/Build";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../../redux/Slices/singleProductSlice";
import Loading from "../../components/Loading";

// Styled TabPanel component directly within the file
const TabPanel = styled("div")(({ theme, value, index }) => ({
  display: value === index ? "block" : "none",
  padding: theme.spacing(3),
}));

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colos, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSizeChange = (size) => {
    const sizeData = sizes.find((s) => s.size === size);
    setColors(sizeData.colors);

    setSelectedColor(sizeData.colors?.[0]);
    setSelectedSize(sizeData);
  };
  const handleColorChange = (color) => {
    const colorData = colos.find((s) => s.color === color);
    setSelectedColor(colorData);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const state = useSelector((state) => state.Singleproduct);

  useEffect(() => {
    try {
      if (state.data) {
        const product = state.data.data;
        setSizes(product.sizes);
        setColors(product.sizes[0].colors);
        setSelectedSize(product.sizes[0]);
        setSelectedColor(product.sizes[0].colors[0]);

        const formattedImages = product.Main_images.map((img) => ({
          original: img.url,

          originalClass: "gallery-image",
          thumbnailClass: "thumb-image",
        }));
        setProductData(product);

        setImages(formattedImages);
        console.log(images);
      }
    } catch (error) {
      console.error("Error While receiving data from backend:", error);
      toast.error("Something went wrong");
    }
  }, [state.data]);

  useEffect(() => {
    dispatch(fetchSingleProduct({ id: id }));
  }, [dispatch]);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

  const Delete = async () => {
    setOpenDeleteDialog(false);
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/product/delet/${id}`
      );
      setLoading(false);
      navigate("/admin/allproduct");
    } catch (error) {
      console.error("Error While receiving data from backend:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Gallery Section with responsive height */}
          <Box
            sx={{
              flex: 1,
              padding: "5px",
              height: "auto",
              overflow: "hidden",
            }}
          >
            <Gallery
              items={images}
              showThumbnails={true}
              showPlayButton={false}
              showFullscreenButton={false}
              thumbnailPosition="bottom"
              slideDuration={700}
              slideInterval={3000}
              showBullets={true}
              showNav={false}
              infinite={true}
              autoPlay={true}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            pl: { xs: 0, lg: 6 },
            pt: { lg: 2 },
          }}
        >
          {/* Content Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: {},
                fontWeight: "800",
              }}
            >
              {productData.name ?? "Product name not available"}
            </Typography>
            <Box display={"flex"}>
              <Typography
                sx={{
                  fontSize: { xs: "1.3rem", sm: "1.6rem" },
                  fontWeight: "400",
                  mr: 1,
                }}
              >
                Current Prices:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.7rem" },
                  fontWeight: "600",
                  color: "#F7A400",
                }}
              >
                {selectedSize.size_price ?? "size_price not available"} Rs
              </Typography>
            </Box>

            <Box display={"flex "} alignItems={"center"} mb={2}>
              <Typography
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fontWeight: "400",
                  mr: 1,
                }}
              >
                Available in Stock:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fontWeight: "500",
                  color: "#F7A400",
                }}
              >
                {selectedColor.stock ?? "Stock not available"}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                fontWeight: "500",
              }}
            >
              Description
            </Typography>
            <Box
              className="truncate"
              component="span"
              sx={{
                display: "block",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: productData.description }}
              />

              {/* {productData.description} */}
            </Box>

            <Divider sx={{ my: 3, borderBottomWidth: "2px" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    mr: 3,
                    fontSize: { xs: "1.2rem", sm: "1.4rem" },
                    color: "#333",
                  }}
                >
                  Sizes:
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                  flexWrap: "wrap",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {sizes.map((size, index) => (
                  <Box
                    key={index}
                    sx={{
                      mr: 2,
                      mb: 2,
                      padding: "0.2rem 0.7rem",
                      backgroundColor: size.selected ? "#F7A400" : "#f5f5f5",
                      borderRadius: "8px",
                      boxShadow: size.selected
                        ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                        : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: size.selected ? "#e69500" : "#e0e0e0",
                      },
                    }}
                    onClick={() => {
                      handleSizeChange(size.size);
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                        fontWeight: "500",
                        color: size.selected ? "#ffffff" : "#666666",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {size.size}
                      {size.size === selectedSize.size && (
                        <CheckIcon sx={{ marginLeft: "0.5rem" }} />
                      )}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box>
                <Typography
                  sx={{ fontWeight: "600", mr: 3, fontSize: "1.2rem" }}
                >
                  Colors :
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {selectedSize && Array.isArray(selectedSize.colors) ? (
                  colos.map((c) => (
                    // specification
                    <Box
                      key={c._id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `2px solid   ${
                            c.color === selectedColor.color
                              ? "transparent"
                              : "#000000"
                          }`, // Conditional border color
                          height: "50px",
                          width: "50px",
                          backgroundColor: c.color,
                          borderRadius: "50%",
                          mb: 1,
                          boxShadow:
                            c.color === selectedColor.color
                              ? "0px 0px 8px rgba(0, 0, 0, 0.8)"
                              : "none", // Conditional shadow
                          transition: "all 0.3s ease", // Smooth transition for hover effects
                          "&:hover": {
                            borderColor: "#666666", // Change border color on hover
                            boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.3)", // Enhance shadow on hover
                          },
                        }}
                        onClick={() => {
                          handleColorChange(c.color);
                        }}
                      >
                        {" "}
                        {c.color === selectedColor.color && (
                          <CheckIcon
                            sx={{
                              position: "relative",
                              left: "25px",
                              bottom: "25px",
                              fontSize: "24px",
                              color: "#000000",
                            }}
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "#666666",
                          }}
                        >
                          {c.colorName}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>Select size to show colors</Typography>
                )}
              </Box>
            </Box>
            <Stack spacing={4} direction="row">
              <Button
                onClick={handleDeleteDialogOpen}
                sx={{
                  backgroundColor: "#0f4ca2",
                  color: "white",
                  "&:hover": { backgroundColor: "#082651" },
                }}
                fullWidth
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                onClick={() =>
                  navigate(`/admin/editproduct/${productData._id}`)
                }
                sx={{ color: "#0f4ca2", border: "1px solid #0f4ca2" }}
                fullWidth
                startIcon={<Build />}
              >
                Edit Product
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Accordion sx={{ marginTop: "10px", width: "100%" }}>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            SPECIFICATIONS <ArrowDropDownIcon />
          </AccordionSummary>
          <AccordionDetails>
            <div
              dangerouslySetInnerHTML={{ __html: selectedSize.specification }}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <Box sx={{ paddingY: 1, paddingX: 3 }}>
          <DialogTitle id="delete-dialog-title">
            Delete Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this Product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={Delete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Toaster position="bottom-right" reverseOrder={true} />
    </Box>
  );
};

export default ProductDetails;
