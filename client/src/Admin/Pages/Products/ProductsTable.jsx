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
import { Backdrop, Chip, CircularProgress } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ProductsTable = ({ products, onDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = (row) => {
    console.log(row);
    navigate(`/admin/editproduct/${row._id}`);
  };

  const handleDelete = async (row) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/product/delet/${
          row._id
        }`
      );
      toast.success("Product deleted successfully");
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
    { field: "ProductId", headerName: "Product Id", width: 200 },
    { field: "ProductName", headerName: "Product Name", width: 200 },
    {
      field: "ProductImage",
      headerName: "Product Image",
      width: 200,
      renderCell: (params) => (
        <Avatar
          alt={params.row.ProductName}
          src={params.value}
          variant="square"
          sx={{ width: 90, height: 90, mt: 1, mb: 1 }}
        />
      ),
    },
    { field: "ProductCurrentType", headerName: "Current Type", width: 220 },
    {
      field: "ProductSizes",
      headerName: "Product Sizes",
      width: 220,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingY: 1,
            gap: 0.5,
          }}
        >
          {params.value?.split(", ").map((size, index) => (
            <Chip
              key={index}
              label={size}
              sx={{
                backgroundColor: "#f0f0f0",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "0.8rem",
                borderRadius: "3px",
              }}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "ProductActions",
      headerName: "Product Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="view"
            onClick={() => navigate(`/admin/productdetails/${params.row._id}`)}
            sx={{ backgroundColor: "#f0f0f0", color: "#758694" }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row)}
            sx={{ backgroundColor: "#f0f0f0", mx: 1, color: "#16325B" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row)}
            sx={{ backgroundColor: "#f0f0f0", color: "#B8001F" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = products?.map((product, index) => ({
    id: index + 1,
    _id: product._id,
    ProductId: product.id,
    ProductName: product.name,
    ProductImage: product.thumbnail[0]?.url,
    ProductCurrentType: product.currentType,
    ProductSizes: product.sizes?.map((size) => size.size).join(", ") || "",
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

export default ProductsTable;
