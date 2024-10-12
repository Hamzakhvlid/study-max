import React, { useEffect, useMemo, useRef, useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import axios from "axios";
import shortid from "shortid";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AddProduct.css";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import { fetchCategories } from "../../../redux/Slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([
    {
      size: "",
      specification: "",
      size_price: "",
      colors: [{ color: "", colorName: "", stock: "" }],
    },
  ]);
  const [message, setMessage] = useState("");
  const fileSizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleImageChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    setProductImages((prevImages) => [...prevImages, ...newFiles]);
    const promises = newFiles.map((file) => {
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

    const newFileData = await Promise.all(promises);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFileData]);
  };

  const handleDeleteDialogOpen = (id, type) => {
    console.log(id, type);

    setFileToDelete(id);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setFileToDelete(null);
    setDeleteType("");
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

  const confirmDelete = () => {
    if (deleteType === "selected") {
      // Remove from selectedFiles
      const updatedSelectedFiles = selectedFiles.filter(
        (file) => file.id !== fileToDelete
      );
      setSelectedFiles(updatedSelectedFiles);

      // Remove from productImages
      const updatedProductImages = productImages.filter(
        (file) =>
          file.name !==
          selectedFiles.find((file) => file.id === fileToDelete).filename
      );
      setProductImages(updatedProductImages);
    } else if (deleteType === "uploaded") {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== fileToDelete)
      );
    }
    handleDeleteDialogClose();
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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

  const handleDeleteSize = (sizeIndex) => {
    const updatedSizes = sizes.filter((_, index) => index !== sizeIndex);
    setSizes(updatedSizes);
  };

  const handleDeleteColor = (sizeIndex, colorIndex) => {
    // Create a new array with the colors removed
    const updatedSizes = sizes.map((size, index) => {
      if (index === sizeIndex) {
        // For the selected size, filter out the color to be deleted
        return {
          ...size,
          colors: size.colors.filter((_, colorIdx) => colorIdx !== colorIndex),
        };
      }
      // For all other sizes, return them unchanged
      return size;
    });

    // Update state with the new array
    setSizes(updatedSizes);

    console.log(sizes); // Logs the old state before the state update
    console.log(updatedSizes); // Logs the new state after the color is removed
    console.log(
      `Delete Clicked at size index ${sizeIndex} and color index ${colorIndex}`
    );
  };

  const handleColorChange = (sizeIndex, colorIndex, event) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].colors[colorIndex][event.target.name] =
      event.target.value;
    setSizes(newSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (sizes.length === 0) {
      toast.error("Add atleast one size !!");
      return;
    }

    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i].colors.length === 0) {
        setMessage("Each size must have at least one color.");
        return;
      }
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("thumbnail", selectedFile);
    formData.append("category", selectedCategory);
    formData.append("name", productName);
    formData.append("id", productId);
    formData.append("description", productDescription);
    formData.append("currentType", selectedCurrent);

    // Append product images
    productImages.forEach((file) => {
      formData.append("productImages", file);
    });

    // Append sizes as JSON string
    formData.append("sizes", JSON.stringify(sizes));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/product/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setMessage(response.data.message);
      toast.success("Successfully Product Uploaded !");

      // Reset form fields
      setSelectedCategory("");
      setProductName("");
      setProductId("");
      setProductDescription("");
      setSelectedCurrent("");
      setProductImages([]);
      setSelectedFile(null);
      setPreview("");
      setSelectedFiles([]);
      setSizes([
        {
          size: "",
          specification: "",
          size_price: "",
          colors: [{ color: "", colorName: "", stock: "" }],
        },
      ]);
      document.getElementsByName("productImages").value = ""; // Clear the file input
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response.data);
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

  if (categoryState.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center  w-full min-h-screen">
        <h1>No Category added. Add Atleast One Category to add product </h1>
        <button
          onClick={() => navigate("/admin/addcategory")}
          className="relative mt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-[#0B355B] to-[#0B355B] group-hover:from-[#0B355B] group-hover:to-[#0B355B] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#0B355B] dark:focus:ring-[#0B355B]"
        >
          <span className="relative px-5 py-2.5 text-black hover:text-white transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Category
          </span>
        </button>
      </div>
    );
  }

  const [currentTypes, setCurrentTypes] = useState([]);
  const [newCurrentType, setNewCurrentType] = useState("");

  useEffect(() => {
    // Fetch current types from server on component mount
    const fetchCurrentTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/types`,
  );
        setCurrentTypes(response.data); 
      } catch (error) {
        console.error("Error fetching current types:", error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    fetchCurrentTypes();
  }, []);

 


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
                      {currentTypes.map((type, index) => (
                 <MenuItem value="AC_only">{type.name}</MenuItem>
              ))}
                    
                    
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
                                    filetype,
                                    fileimage,
                                    datetime,
                                    filesize,
                                  } = data;
                                  return (
                                    <Grid item xs={12} md={12} lg={6} key={id}>
                                      <div className="file-atc-box">
                                        {filename.match(
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
                                              Modified Time : {datetime}
                                            </span>
                                          </p>
                                          <div className="file-actions">
                                            <button
                                              type="button"
                                              className="file-action-btn"
                                              onClick={() =>
                                                handleDeleteDialogOpen(
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
                                    id,
                                    filename,
                                    filetype,
                                    fileimage,
                                    datetime,
                                    filesize,
                                  } = data;
                                  return (
                                    <div className="file-atc-box" key={index}>
                                      {filename.match(
                                        /.(jpg|jpeg|png|gif|svg)$/i
                                      ) ? (
                                        <div className="file-image">
                                          {" "}
                                          <img src={fileimage} alt="" />
                                        </div>
                                      ) : (
                                        <div className="file-image">
                                          <i className="far fa-file-alt"></i>
                                        </div>
                                      )}
                                      <div className="file-detail">
                                        <h6>{filename}</h6>
                                        <p>
                                          <span>Size : {filesize}</span>
                                          <span className="ml-3">
                                            Modified Time : {datetime}
                                          </span>
                                        </p>
                                        <div className="file-actions">
                                          <button
                                            className="file-action-btn"
                                            onClick={() =>
                                              handleDeleteDialogOpen(
                                                id,
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
                  disabled={loading}
                >
                  Upload Product
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
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Toaster position="bottom-center" reverseOrder={true} />
      </form>
    </Box>
  );
};

export default AddProduct;
