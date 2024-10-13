import React, { useState, useEffect } from 'react';
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
  Chip,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddSubject = () => {
  const [exam, setExam] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(''); // For individual level input
  const [levels, setLevels] = useState([]); // For storing selected levels
  const [loading, setLoading] = useState(false);

  const handleExamChange = (e) => {
    setExam(e.target.value);
    // Clear levels when exam type changes
    setLevels([]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleAddLevel = () => {
    if (level && !levels.includes(level)) {
      setLevels([...levels, level]);
      setLevel(''); // Clear the input after adding
    }
  };

  const handleDeleteLevel = (levelToDelete) => {
    setLevels(levels.filter((lvl) => lvl !== levelToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/subjects`,
        { exam, name, levels },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );

      setLoading(false);
      toast.success(response.data.message);

      // Reset form fields
      setExam('');
      setName('');
      setLevel('');
      setLevels([]);
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error(error.response.data.error || "Error adding subject"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Add Subject
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Exam Type Select */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="exam-select-label">Exam Type</InputLabel>
              <Select
                labelId="exam-select-label"
                id="exam-select"
                value={exam}
                label="Exam Type"
                onChange={handleExamChange}
                required
              >
                <MenuItem value="Leaving Certificate">
                  Leaving Certificate
                </MenuItem>
                <MenuItem value="Junior Cycle">Junior Cycle</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Subject Name Input */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Subject Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              required
            />
          </Grid>

          {/* Level Input and Add Button */}
          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <InputLabel id="level-select-label">Level</InputLabel>
              <Select
                labelId="level-select-label"
                id="level-select"
                value={level}
                label="Level"
                onChange={handleLevelChange}
              >
                <MenuItem value="Higher">Higher</MenuItem>
                <MenuItem value="Ordinary">Ordinary</MenuItem>
                <MenuItem value="Common">Common</MenuItem>
                <MenuItem value="Foundation">Foundation</MenuItem>
                <MenuItem value="No Level needed">No Level needed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1} sx={{ marginTop: "16px" }}>
            <Button variant="contained" onClick={handleAddLevel}>
              Add
            </Button>
          </Grid>

          {/* Display Selected Levels */}
          <Grid item xs={12}>
            {levels.length > 0 && (
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Selected Levels:
              </Typography>
            )}
            <Box>
              {levels.map((lvl) => (
                <Chip
                  key={lvl}
                  label={lvl}
                  onDelete={() => handleDeleteLevel(lvl)}
                  sx={{ marginRight: 1, marginBottom: 1 }}
                />
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" disabled={loading}>
              Add Subject
            </Button>
          </Grid>
        </Grid>
      </form>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Toaster position="bottom-center" reverseOrder={true} />
    </Box>
  );
};

export default AddSubject;