import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import "./CategoryPage.css";
import { useEffect } from "react";
import axios from "axios";
import Dropdown from "../../components/Dropdown";
import { fetchCategories } from "../../../redux/Slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import CategoryTable from "./CategoryTable";

export default function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);

  const handleCategoryDelete = (categoryId) => {
    // Filter out the deleted category from the list
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== categoryId)
    );
  };

  const state = useSelector((state) => state.categories);
  useEffect(() => {
    if (state.data) {
      setCategories(state.data);
    }
  }, [state.data]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loading />
      </div>
    );
  }

  if (state.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center  w-full min-h-screen">
        <h1>No Category added. Add some </h1>
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

  return (
    <>
      {/* <Box>
        <Grid container spacing={3}>
          {categories.map((category) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                <Card className="card-1 relative">
                  <Dropdown id={category._id} />
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={category.categoryImage.url}
                      alt={"category image"}
                      sx={{ maxHeight: "30vh", minHeight: "30vh" }}
                    />
                    <CardContent className="cardContent">
                      <Typography
                        gutterBottom
                        variant="h7"
                        sx={{
                          lineHeight: "12px",
                          fontWeight: "600",
                          color: "#4d4d4d",
                        }}
                        component="div"
                      >
                        {category.categoryName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", color: "#990000" }}
                        color="text.secondary"
                      >
                        {category.categoryId}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box> */}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "600", color: "#808080", display: "inline" }}
          >
            Categories
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: "40px" }}>
          <CategoryTable
            categories={categories}
            onDelete={handleCategoryDelete}
          />
        </Grid>
      </Grid>
    </>
  );
}
