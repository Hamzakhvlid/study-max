import { Box, Button, Pagination as MuiPagination } from "@mui/material";
import React from "react";

const Pagination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-page": {
              transition: "transform 0.1s ease-in-out",
              fontWeight: "700",
              "&.Mui-selected": {
                fontWeight: "700",
                backgroundColor: "#6d818b",
                color: "#fff",
                border: "none",

                "&:hover": {
                  backgroundColor: "#7d8f98",
                  transform: "scale(1.2)",
                  fontWeight: "700",
                  border: "none",
                },
              },
              "&:hover": {
                backgroundColor: "#ced5d8",
                transform: "scale(1.2)",
                fontWeight: "700",
                border: "none",
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default Pagination;
