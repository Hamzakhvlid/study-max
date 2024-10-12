import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

const ManageCurrentTypes = () => {
  const [currentTypes, setCurrentTypes] = useState([]);
  const [newCurrentType, setNewCurrentType] = useState("");

  useEffect(() => {
    const fetchCurrentTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/types`);
        setCurrentTypes(response.data);
      } catch (error) {
        console.error("Error fetching current types:", error);
      }
    };

    fetchCurrentTypes();
  }, []);

  const handleAddCurrentType = async () => {
    if (newCurrentType.trim() === "") return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/types/add`,
        { name: newCurrentType.trim() },
        {withCredentials:true}
      );
    
      setCurrentTypes([...currentTypes, response.data]);
      setNewCurrentType("");
    } catch (error) {
       
      console.error("Error adding current type:", error);
    }
  };

  const handleDeleteCurrentType = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/types/${id}`,  {withCredentials:true});
      const updatedTypes = currentTypes.filter((type) => type._id !== id);
      setCurrentTypes(updatedTypes);
    } catch (error) {
      console.error("Error deleting current type:", error);
    }
  };


  return (
    <Grid item xs={12} mt={2}>
      <Typography variant="h6">Manage Current Types</Typography>
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="New Current Type"
            variant="outlined"
            fullWidth
            value={newCurrentType}
            onChange={(e) => setNewCurrentType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            onClick={handleAddCurrentType}
            startIcon={<AddIcon />}
          >
            Add Type
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={2}>
        <List>
          {currentTypes.map((type, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <IconButton
                  edge="start"
                  aria-label="delete"
                  onClick={() => handleDeleteCurrentType(type._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={type.name} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ManageCurrentTypes;