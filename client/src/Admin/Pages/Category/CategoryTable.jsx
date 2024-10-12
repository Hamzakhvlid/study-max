import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

const CategoryTable = ({ categories, onDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = (row) => {
    console.log(row);
    navigate(`/admin/editcategory/${row._id}`);
  };

  const handleDelete = async (row) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/category/deleteCategory/${row._id}`
      );
      toast.success("Category deleted successfully");
      onDelete(row._id);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 100 },
    { field: "CategoryId", headerName: "Category Id", width: 200 },
    {
      field: "CategoryImage",
      headerName: "Category Image",
      width: 200,
      renderCell: (params) => (
        <Avatar
          alt={params.row.CategoryName}
          src={params.value}
          variant="square"
          sx={{ width: 90, height: 90, mt: 1, mb: 1 }}
        />
      ),
    },
    { field: "CategoryName", headerName: "Category Name", width: 200 },
    { field: "CategoryDesc", headerName: "Category Description", width: 420 },
    {
      field: "CategoryActions",
      headerName: "Category Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row)}
            color="primary"
            sx={{ ml: 2 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = categories?.map((category, index) => ({
    id: index + 1,
    _id: category._id,
    CategoryId: category.categoryId,
    CategoryName: category.categoryName,
    CategoryDesc: category.categoryDesc,
    CategoryImage: category.categoryImage.url, // Assuming you have image URL here
  }));

  return (
    <Box sx={{ height: "74vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[8]}
        disableRowSelectionOnClick
        getRowHeight={() => 110} // Set the row height to fit the image (70px + padding)
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#e7edf3",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "black",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "#e7edf3",
          },
          "& .MuiDataGrid-cell": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </Box>
  );
};

export default CategoryTable;
