import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddCategoryForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDesc: "",
    categoryId: "",
    categoryImage: null,
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const categoryData = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/category/createCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (categoryData) {
        console.log("Category created successfully");
        toast.success("Category created successfully!");
        setFormData({
          categoryName: "",
          categoryId: "",
          categoryDesc: "",
          categoryImage: null,
        });
        setSelectedFile(null);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file.name);
      setFormData({ ...formData, categoryImage: file });
    } else {
      setSelectedFile(null);
      setFormData({ ...formData, categoryImage: null });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            padding: "50px",
            borderRadius: "3px",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
            width: "50vw",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "700", marginBottom: "15px", color: "#4d4d4d" }}
          >
            Category Form
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              name="categoryName"
              label="Category Name"
              required
              variant="outlined"
              fullWidth
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
              sx={{ marginTop: "30px" }}
            />

            <TextField
              name="categoryDesc"
              label="Category Description"
              required
              variant="outlined"
              fullWidth
              value={formData.categoryDesc}
              onChange={(e) =>
                setFormData({ ...formData, categoryDesc: e.target.value })
              }
              sx={{ marginTop: "30px" }}
            />
            <TextField
              name="categoryId"
              label="Category Id"
              variant="outlined"
              required
              fullWidth
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              sx={{ marginTop: "30px" }}
            />

            <input
              accept="image/*, .pdf"
              style={{ display: "none" }}
              id="add-file"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <label htmlFor="add-file">
              <Button
                fullWidth
                variant="outlined"
                component="span"
                sx={{
                  marginTop: "30px",
                  color: "black",
                  borderColor: "#4d4d4d",
                  "&:hover": {
                    borderColor: "#4d4d4d",
                    backgroundColor: "#cccccc",
                  },
                }}
              >
                Category Image
              </Button>
            </label>
            {selectedFile && (
              <Typography
                variant="body2"
                sx={{ marginTop: "10px", color: "#4d4d4d" }}
              >
                Selected File: {selectedFile}
              </Typography>
            )}

            <Button
              sx={{
                marginTop: "30px",
                backgroundColor: "#808080",
                boxShadow: "0px 1px 32px -11px rgba(30, 30, 31, 1)",
                WebkitBoxShadow: "0px 1px 32px -11px rgba(30, 30, 31, 1)",
                MozBoxShadow: "0px 1px 32px -11px rgba(30, 30, 31, 1)",
                color: "#fff",
                paddingX: 3,
                "&:hover": {
                  backgroundColor: "#4d4d4d",
                },
              }}
              startIcon={<AddIcon />}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Box>
      </Box>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default AddCategoryForm;
