import { Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/Slices/categoriesSlice";
import { fetchSingleCategories } from "../../redux/Slices/singleCategorySlice";

const Dropdown = ({ id }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/editcategory/${id}`);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/category/deleteCategory/${id}`
      );
      toast.success("Product deleted successfully");
      handleClose();
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="absolute right-0 top-0 z-30">
      <button
        onClick={handleMenuClick}
        className="inline-flex items-center p-2 text-sm font-medium text-gray-900 bg-transparent rounded-full hover:bg-opacity-30 dark:hover:bg-opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        <MenuItem
          onClick={handleEdit}
          sx={{
            color: "#1e88e5", // Primary blue
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "16px",
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": {
              backgroundColor: "#e3f2fd", // Light blue background
              color: "#0d47a1", // Darker blue text
            },
          }}
        >
          <MdOutlineEdit size={20} />
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "#e53935", // Primary red
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "16px",
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": {
              backgroundColor: "#ffebee", // Light red background
              color: "#b71c1c", // Darker red text
            },
          }}
        >
          <MdDelete size={20} />
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Dropdown;
