import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCategories } from "../../../redux/Slices/singleCategorySlice";
import Loading from "../../components/Loading";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  // State for storing the selected file and the form data, including the category name, ID, and image.
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryId: "",
    categoryImage: null,
  });

  // This function handles the form submission.
  // It sends an HTTP PUT request to update an existing category using the data stored in `formData`.
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Sending the form data to the backend to update the category
      const categoryData = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/category/editCategory/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If the request is successful, show a success toast notification and reset the form.
      if (categoryData) {
        toast.success("Category updated successfully!");

        setFormData({
          categoryName: "",
          categoryId: "",
          categoryImage: null,
        });
        setSelectedFile(null);

        // Navigate to the categories list page.
        navigate("/admin/categories");
      }
      setLoading(false);
    } catch (error) {
      // In case of an error, log it and show an error toast notification.
      console.log("Error creating category");
      toast.error("Error creating category!");
    } finally {
      setLoading(false);
    }
  };

  // This function handles the file input change.
  // It updates the `selectedFile` state with the file name and updates the `formData` with the selected file.
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

  // useSelector hook is used to access the `Singlecategory` state from the Redux store.
  const state = useSelector((state) => state.Singlecategory);

  // useEffect hook is used to update the form data with the category data fetched from the store.
  // This effect runs whenever the `state.data` changes.
  useEffect(() => {
    if (state.data) {
      setSelectedFile(state.data?.categoryImage.url);
      setFormData(state.data || {});
    }
  }, [state.data]);

  // useEffect hook is used to dispatch an action to fetch a single category when the component mounts.
  // This effect runs once on the initial render or whenever the `dispatch` dependency changes.
  useEffect(() => {
    dispatch(fetchSingleCategories({ id: id }));
  }, [dispatch]);

  // If the data is still loading, a loading spinner is displayed.
  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

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
            boxShadow: "0px 1px 24px -11px rgba(30, 30, 31, 1)",
            WebkitBoxShadow: "0px 1px 24px -11px rgba(30, 30, 31, 1)",
            MozBoxShadow: "0px 1px 24px -11px rgba(30, 30, 31, 1)",
            width: "50vw",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", marginBottom: "15px", color: "#4d4d4d" }}
          >
            Category Form
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              name="categoryName"
              label="Category Name"
              variant="outlined"
              fullWidth
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
            />
            <TextField
              name="categoryId"
              label="Category Id"
              variant="outlined"
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
              Update
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
