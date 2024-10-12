import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "../../redux/Slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Chip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ColorDisplay from "./colordisplay";

const columns = [
  { field: "productName", headerName: "Product Name", width: 200 },
  { field: "totalStock", headerName: "Total Stock", width: 150 },
  {
    field: "sizes",
    headerName: "Sizes",
    width: 200,
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
              backgroundColor: "#e6e6e6",
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
    field: "colors",
    headerName: "Colors",
    width: 350,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          whiteSpace: "normal",
        }}
      >
        {(params.value?.split(", ") || []).map((item, index) => {
          const [size, color] = item.split(" - ");
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingY: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {size} <ArrowForwardIcon />
                </Typography>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: color,
                    borderRadius: "2px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    marginTop: 0.5,
                  }}
                />
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {color}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    ),
  },
  {
    field: "stockStatus",
    headerName: "Stock Status",
    width: 413,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          whiteSpace: "normal",
        }}
      >
        {(params.value?.split("; ") || []).map((item, index) => (
          <ColorDisplay item={item} index={index}></ColorDisplay>
        ))}
      </Box>
    ),
  },
];


const StockTable = () => {
  
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.data) {
      setProducts(state.data.products);
    }
  }, [state.data]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const rows = products.map((product, index) => {
    const sizesData = product.sizes?.map((size) => size.size).join(", ") || "";
    const colorsData =
      product.sizes
        ?.map(
          (size) =>
            size.colors
              ?.map((color) => `${size.size} - ${color.color}`)
              .join(", ") || ""
        )
        .join(", ") || "";
    const stockData =
      product.sizes
        ?.map((size) =>
          size.colors
            ?.map((color) => `${size.size} -> ${color.color} -> ${color.stock}`)
            .join(", ")
        )
        .join("; ") || "";

    return {
      id: product._id, // Use the product ID as the unique identifier
      productName: product.name || "Unknown Product",
      totalStock: product.sizes
        ? product.sizes.reduce(
            (acc, size) =>
              acc + size.colors?.reduce((sum, color) => sum + color.stock, 0) ||
              0,
            0
          )
        : 0,
      sizes: sizesData,
      colors: colorsData,
      stockStatus: stockData,
    };
  });

  const handleRowClick = (params) => {
    const productId = params.row.id; // Get the product ID from the row
    navigate(`/admin/edit-stock/${productId}`); // Navigate to the edit page with the product ID
  };

  return (
    <Box sx={{ height: "74vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableRowSelectionOnClick
        onRowClick={handleRowClick} // Handle row click
        getRowHeight={() => "auto"}
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
        }}
      />
    </Box>
  );
};

export default StockTable;
