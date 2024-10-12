import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import shortid from "shortid";
import DeleteIcon from "@mui/icons-material/Delete";

import "./AddProduct.css";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../redux/Slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCurrent, setSelectedCurrent] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [loading, setLoading] = useState(false);
  // const [thumbnail, setthumnail] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [sizes, setSizes] = useState([
    {
      size: "",
      specification: "",
      size_price: "",
      colors: [{ color: "", colorName: "", stock: "" }],
    },
  ]);

  const { id } = useParams();

  const fileSizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
    console.log(uploadedFiles);

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: shortid.generate(),
            filename: file.name,
            filetype: file.type,
            fileimage: reader.result,
            datetime: file.lastModifiedDate.toLocaleString("en-IN"),
            filesize: fileSizes(file.size),
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    const fileData = await Promise.all(promises);
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileData]);
  };

  const handleDeleteDialogOpen = (event, id, type) => {
    event.preventDefault();
    setFileToDelete(id);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setFileToDelete(null);
    setDeleteType("");
  };

  const confirmDelete = () => {
    handleDeleteDialogClose();
    setLoading(true);
    if (deleteType === "selected") {
      const updatedSelectedFiles = selectedFiles.filter(
        (file) => file.id !== fileToDelete
      );
      setSelectedFiles(updatedSelectedFiles);

      const updatedProductImages = productImages.filter(
        (file) =>
          file.name !==
          selectedFiles.find((file) => file.id === fileToDelete).filename
      );
      setProductImages(updatedProductImages);
      setLoading(false);
    } else if (deleteType === "uploaded") {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.original_filename !== fileToDelete)
      );
      setLoading(false);
    }
  };

  const handleAddSize = () => {
    setSizes([
      ...sizes,
      {
        size: "",
        specification: "",
        size_price: "",
        colors: [{ color: "", colorName: "", stock: "" }],
      },
    ]);
  };

  const handleAddColor = (event, sizeIndex) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors.push({ color: "", colorName: "", stock: "" });
    setSizes(newSizes);
  };

  const handleSizeChange = (index, event) => {
    const newSizes = [...sizes];
    newSizes[index][event.target.name] = event.target.value;
    setSizes(newSizes);
  };

  const handleColorChange = (sizeIndex, colorIndex, event) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors[colorIndex][event.target.name] =
      event.target.value;
    setSizes(newSizes);
  };
  const handleDeleteSize = (sizeIndex) => {
    const updatedSizes = sizes.filter((_, index) => index !== sizeIndex);
    setSizes(updatedSizes);
  };

  const handleDeleteColor = (sizeIndex, colorIndex) => {
    const updatedSizes = sizes.map((size, index) => {
      if (index === sizeIndex) {
        return {
          ...size,
          colors: size.colors.filter((_, colorIdx) => colorIdx !== colorIndex),
        };
      }

      return size;
    });
    setSizes(updatedSizes);
  };

  const handleSingleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile([]);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", selectedFile);
    formData.append("category", selectedCategory);
    formData.append("name", productName);
    formData.append("id", productId);
    formData.append("description", productDescription);
    formData.append("currentType", selectedCurrent);
    uploadedFiles.forEach((file, index) => {
      formData.append(`filePath`, file.url);
    });
    productImages.forEach((file) => {
      formData.append("productImages", file);
    });
    formData.append("sizes", JSON.stringify(sizes));

    console.log(...formData);

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/product/editproduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedCategory("");
      setProductName("");
      setProductId("");
      setProductDescription("");
      setSelectedCurrent("");
      setSelectedFiles([]);
      setUploadedFiles([]);
      setSizes([
        {
          size: "",
          specification: "",
          size_price: "",
          colors: [{ color: "", colorName: "", stock: "" }],
        },
      ]);
      setLoading(false);
      navigate(`/admin/productdetails/${id}`);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const categoryState = useSelector((state) => state.categories);

  useEffect(() => {
    if (categoryState.data) {
      setCategories(categoryState.data);
    }
  }, [categoryState.data]);

  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, []);

  useEffect(() => {
    if (id) {
      const fetchCourseData = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_DOMAIN_NAME
            }/api/product/product/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const product = response.data.data;

          setImages(product.Main_images);
          // setPreview(product?.thumbnail[0].filePath);
          setPreview(product?.thumbnail[0].url);
          setSelectedFile(product?.thumbnail[0].url);
          setProductName(product?.name);
          setProductId(product?.id);
          setSelectedCategory(product?.category);
          setSelectedCurrent(product?.currentType);
          setProductDescription(product?.description);
          setUploadedFiles(product?.Main_images);
          setSizes(product?.sizes);
        } catch (error) {
          console.error("There was an error fetching the course data!", error);
        }
      };

      fetchCourseData();
    }
  }, [id]);

  if (categoryState.isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Box padding={2}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              sx={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "8px",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 0 }}
                >
                  Product Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  name="productName"
                  type="text"
                  value={productName}
                  required
                  onChange={(e) => setProductName(e.target.value)}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  name="productId"
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                  label="Product ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Select Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    Select Current Type
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCurrent}
                    label="Select Current Type"
                    onChange={(e) => setSelectedCurrent(e.target.value)}
                    required
                  >
                    <MenuItem value="AC_only">AC only</MenuItem>
                    <MenuItem value="DC_only">DC only</MenuItem>
                    <MenuItem value="AC_DC">AC and DC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    marginBottom: 1,
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#475f7b",
                  }}
                >
                  Product Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={productDescription}
                  onChange={(content) => setProductDescription(content)}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="fileupload-view">
                  <div className="row justify-content-center m-0">
                    <div className="col-md-6">
                      <div className="card mt-5">
                        <div className="card-body">
                          <div className="kb-data-box">
                            <div className="kb-modal-data-title">
                              <div className="kb-data-title">
                                <h6>Product Thumbnail</h6>
                              </div>
                            </div>

                            <div className="kb-file-upload">
                              <div className="file-upload-box">
                                <input
                                  type="file"
                                  name="thumbnail"
                                  className="file-upload-input"
                                  onChange={handleSingleImageChange}
                                  accept="image/*"
                                />
                                <span>
                                  Drag and drop or{" "}
                                  <span className="file-link">
                                    Choose your file
                                  </span>
                                </span>
                              </div>
                            </div>

                            {preview && (
                              <div className="kb-attach-box mb-3">
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <div className="file-atc-box">
                                      <div className="file-image">
                                        <img src={preview} alt="selected" />
                                      </div>
                                      <div className="file-detail">
                                        <h6>{selectedFile?.name}</h6>
                                        <p>
                                          <span>
                                            Size :{" "}
                                            {(
                                              selectedFile?.size / 1024
                                            ).toFixed(2)}{" "}
                                            KB
                                          </span>
                                          <br />
                                          <span>
                                            Modified Time :{" "}
                                            {new Date(
                                              selectedFile?.lastModified
                                            ).toLocaleString()}
                                          </span>
                                        </p>
                                        <div className="file-actions">
                                          <button
                                            type="button"
                                            className="file-action-btn"
                                            onClick={handleRemoveFile}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="fileupload-view">
                  <div className="row justify-content-center m-0">
                    <div className="col-md-6">
                      <div className="card mt-5">
                        <div className="card-body">
                          <div className="kb-data-box">
                            <div className="kb-modal-data-title">
                              <div className="kb-data-title">
                                <h6>Multiple File Upload With Preview</h6>
                              </div>
                            </div>

                            <div className="kb-file-upload">
                              <div className="file-upload-box">
                                <input
                                  type="file"
                                  id="fileupload"
                                  name="productImages"
                                  className="file-upload-input"
                                  onChange={handleImageChange}
                                  multiple
                                />
                                <span>
                                  Drag and drop or{" "}
                                  <span className="file-link">
                                    Choose your files
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="kb-attach-box mb-3">
                              <Grid container spacing={2}>
                                {selectedFiles.map((data, index) => {
                                  const {
                                    id,
                                    filename,
                                    filePath,
                                    filetype,
                                    fileimage,
                                    file_date,
                                    filesize,
                                  } = data;
                                  return (
                                    <Grid item xs={12} md={12} lg={6} key={id}>
                                      <div className="file-atc-box">
                                        {filetype.match(
                                          /.(jpg|jpeg|png|gif|svg)$/i
                                        ) ? (
                                          <div className="file-image">
                                            {" "}
                                            <img
                                              src={fileimage}
                                              alt="selected image"
                                            />
                                          </div>
                                        ) : (
                                          <div className="file-image">
                                            <i className="far fa-file-alt"></i>
                                          </div>
                                        )}
                                        <div className="file-detail">
                                          <h6>{filename}</h6>
                                          <p></p>
                                          <p>
                                            <span>Size : {filesize}</span>
                                            <br />
                                            <span>
                                              Modified Time : {file_date}
                                            </span>
                                          </p>
                                          <div className="file-actions">
                                            <button
                                              type="button"
                                              className="file-action-btn"
                                              onClick={(event) =>
                                                handleDeleteDialogOpen(
                                                  event,
                                                  id,
                                                  "selected"
                                                )
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </div>

                            {uploadedFiles.length > 0 ? (
                              <div className="kb-attach-box">
                                {uploadedFiles.map((data, index) => {
                                  const {
                                    public_id,
                                    created_at,
                                    bytes,
                                    format,
                                    original_filename,
                                    url,
                                  } = data;
                                  return (
                                    <div className="file-atc-box" key={index}>
                                      <div className="file-image">
                                        {" "}
                                        <img src={url} alt="" />
                                      </div>

                                      <div className="file-detail">
                                        <h6>{original_filename}</h6>
                                        <p>
                                          <span>Size : {bytes}</span>
                                          <span className="ml-3">
                                            Modified Time : {created_at}
                                          </span>
                                        </p>
                                        <div className="file-actions">
                                          <button
                                            className="file-action-btn"
                                            onClick={(event) =>
                                              handleDeleteDialogOpen(
                                                event,
                                                original_filename,
                                                "uploaded"
                                              )
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                {sizes.map((size, sizeIndex) => (
                  <div key={sizeIndex}>
                    <Divider
                      sx={{
                        marginTop: 5,
                        borderBottom: "2px solid #c8cfd7",
                        display: sizeIndex > 0 ? "block" : "none",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: sizeIndex > 0 ? 4 : 0,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            marginTop: 0,
                            marginBottom: 1,
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "#475f7b",
                          }}
                        >
                          Size {sizeIndex + 1}
                        </Typography>
                      </Box>
                      {sizeIndex === 0 ? (
                        ""
                      ) : (
                        <Box>
                          <Button
                            variant="text"
                            onClick={(event) => handleDeleteSize(sizeIndex)}
                            sx={{
                              color: "#d32f2f", // Red color for delete
                              "&:hover": { backgroundColor: "#fddede" }, // Light red hover effect
                              marginBottom: "10px",
                            }}
                            startIcon={<DeleteIcon sx={{ color: "#d32f2f" }} />}
                          >
                            Delete
                          </Button>
                        </Box>
                      )}
                      {sizeIndex === 0 && (
                        <Box>
                          <Button
                            variant="text"
                            onClick={handleAddSize}
                            sx={{
                              color: "#2b394a",
                              "&:hover": { backgroundColor: "#edeff2" },
                              marginBottom: "10px",
                            }}
                            startIcon={<AddIcon sx={{ color: "#2b394a" }} />}
                          >
                            Add Size
                          </Button>
                        </Box>
                      )}
                    </Box>
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id={`size-${sizeIndex}`}
                            label="Size:"
                            name="size"
                            type="text"
                            value={size.size}
                            onChange={(e) => handleSizeChange(sizeIndex, e)}
                            required
                            variant="outlined"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id={`size_price-${sizeIndex}`}
                            name="size_price"
                            type="number"
                            value={size.size_price}
                            required
                            onChange={(e) => handleSizeChange(sizeIndex, e)}
                            label="Price:"
                            variant="outlined"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <textarea
                            id={`specification-${sizeIndex}`}
                            name="specification"
                            type="text"
                            value={size.specification}
                            required
                            onChange={(e) => handleSizeChange(sizeIndex, e)}
                            rows="2"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write size specification here in points..."
                          ></textarea>
                        </Grid>
                        <Grid item xs={12}>
                          {size.colors.map((color, colorIndex) => (
                            <div key={colorIndex}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginTop: colorIndex > 0 ? 2 : 0,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      marginTop: 1,
                                      marginBottom: 1,
                                      fontSize: "15px",
                                      fontWeight: "600",
                                      color: "#475f7b",
                                    }}
                                  >
                                    Color {colorIndex + 1}
                                  </Typography>
                                </Box>
                                {colorIndex === 0 && (
                                  <Box>
                                    <Button
                                      sx={{
                                        color: "#2b394a",
                                        "&:hover": {
                                          backgroundColor: "#edeff2",
                                        },
                                        marginBottom: "10px",
                                      }}
                                      variant="text"
                                      startIcon={
                                        <AddIcon sx={{ color: "#2b394a" }} />
                                      }
                                      onClick={(event) =>
                                        handleAddColor(event, sizeIndex)
                                      }
                                    >
                                      Add Color
                                    </Button>
                                  </Box>
                                )}
                                {colorIndex !== 0 && (
                                  <Box>
                                    <Button
                                      variant="text"
                                      onClick={(event) =>
                                        handleDeleteColor(sizeIndex, colorIndex)
                                      }
                                      sx={{
                                        color: "#d32f2f", // Red color for delete
                                        "&:hover": {
                                          backgroundColor: "#fddede",
                                        }, // Light red hover effect
                                        marginBottom: "10px",
                                      }}
                                      startIcon={
                                        <DeleteIcon sx={{ color: "#d32f2f" }} />
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </Box>
                                )}
                              </Box>

                              <div>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id={`color-${sizeIndex}-${colorIndex}`}
                                      name="color"
                                      type="text"
                                      value={color.color}
                                      onChange={(e) =>
                                        handleColorChange(
                                          sizeIndex,
                                          colorIndex,
                                          e
                                        )
                                      }
                                      required
                                      label="Color Code:"
                                      variant="outlined"
                                      sx={{ width: "100%" }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id={`color-${sizeIndex}-${colorIndex}`}
                                      name="colorName"
                                      type="text"
                                      value={color.colorName}
                                      onChange={(e) =>
                                        handleColorChange(
                                          sizeIndex,
                                          colorIndex,
                                          e
                                        )
                                      }
                                      required
                                      label="Color Name:"
                                      variant="outlined"
                                      sx={{ width: "100%" }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id={`stock-${sizeIndex}-${colorIndex}`}
                                      name="stock"
                                      type="number"
                                      value={color.stock}
                                      required
                                      onChange={(e) =>
                                        handleColorChange(
                                          sizeIndex,
                                          colorIndex,
                                          e
                                        )
                                      }
                                      label="Stock:"
                                      variant="outlined"
                                      sx={{ width: "100%" }}
                                    />
                                  </Grid>
                                </Grid>
                              </div>
                            </div>
                          ))}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} textAlign={"end"} sx={{ marginTop: "20px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    paddingX: 3,
                    paddingY: 2,
                    backgroundColor: "#475f7b",
                    color: "#ffffff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#24303e",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                      transform: "translateY(-10px)",
                      "& .MuiButton-startIcon": {
                        transform: "rotate(-45deg) scale(1.2) translateX(18px)",
                      },
                    },
                    "& .MuiButton-startIcon": {
                      transition: "transform 0.7s ease",
                    },
                  }}
                  startIcon={<SendIcon sx={{ marginRight: "20px" }} />}
                >
                  Edit Product
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
                Are you sure you want to delete this image?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={confirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Toaster position="bottom-right" reverseOrder={true} />
      </form>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};

export default EditProduct;
