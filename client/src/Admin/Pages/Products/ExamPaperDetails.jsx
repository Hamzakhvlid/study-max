import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

const ExamPaperDetails = () => {
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [examPaperToDelete, setExamPaperToDelete] = useState(null);

  // Filter states
  const [examFilter, setExamFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [paperTypeFilter, setPaperTypeFilter] = useState("");

  // Data for filters (you might need to fetch these from your backend)
  const [allSubjects, setAllSubjects] = useState([]);
  const [allLevels, setAllLevels] = useState([
    "Higher",
    "Ordinary",
    "Common",
    "Foundation",
    "No Level needed",
  ]); 
  const [allYears, setAllYears] = useState([]);
  const [allPaperTypes, setAllPaperTypes] = useState([
    "Mock Exam",
    "State Exam",
  ]);

  useEffect(() => {
    fetchExamPapers();
    fetchSubjects(); // Fetch all subjects for the subject filter
    fetchYears();   // Fetch available years for the year filter
  }, [examFilter, subjectFilter, levelFilter, yearFilter, paperTypeFilter]);

  const fetchExamPapers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/exam-papers`, {
        params: {
          exam: examFilter,
          subject: subjectFilter,
          level: levelFilter,
          year: yearFilter,
          paperType: paperTypeFilter,
        },
      });
      setExamPapers(response.data);
    } catch (error) {
      console.error("Error fetching exam papers:", error);
      toast.error("Failed to fetch exam papers");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/subjects`);
      setAllSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchYears = async () => {
    // You'll need to implement this function to fetch unique years
    // from your exam papers data on the backend. 
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/exam-papers/years`); // Adjust route as needed
      setAllYears(response.data);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const handleDeleteDialogOpen = (examPaperId) => {
    setExamPaperToDelete(examPaperId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setExamPaperToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteExamPaper = async () => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/exam-papers/${examPaperToDelete}`);
      toast.success("Exam paper deleted successfully!");
      fetchExamPapers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting exam paper:", error);
      toast.error("Failed to delete exam paper");
    } finally {
      setLoading(false);
      handleDeleteDialogClose();
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Exam Papers
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="exam-filter-label">Exam Type</InputLabel>
            <Select
              labelId="exam-filter-label"
              id="exam-filter"
              value={examFilter}
              label="Exam Type"
              onChange={(e) => setExamFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Leaving Certificate">Leaving Certificate</MenuItem>
              <MenuItem value="Junior Cycle">Junior Cycle</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="subject-filter-label">Subject</InputLabel>
            <Select
              labelId="subject-filter-label"
              id="subject-filter"
              value={subjectFilter}
              label="Subject"
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {allSubjects.map((subj) => (
                <MenuItem key={subj._id} value={subj._id}> 
                  {subj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="year-filter-label">Year</InputLabel>
            <Select
              labelId="year-filter-label"
              id="year-filter"
              value={yearFilter}
              label="Year"
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {allYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Paper Type Filter */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="paperType-filter-label">Paper Type</InputLabel>
            <Select
              labelId="paperType-filter-label"
              id="paperType-filter"
              value={paperTypeFilter}
              label="Paper Type"
              onChange={(e) => setPaperTypeFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {allPaperTypes.map((paperType) => (
                <MenuItem key={paperType} value={paperType}>
                  {paperType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Exam Paper Display Section */}
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid container spacing={2}>
          {examPapers.map((examPaper) => (
            <Grid item key={examPaper._id} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {/* Now accessing subject name from the populated subject object */}
                  {examPaper.subject.name} (
                  {examPaper.exam} - {examPaper.level})
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Year: {examPaper.year}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Paper Type: {examPaper.paperType}
                </Typography>
                {/* Add more details as needed */}

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteDialogOpen(examPaper._id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Delete Exam Paper?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this exam paper? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteExamPaper} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Toaster position="bottom-right" reverseOrder={true} />
    </Box>
  );
};

export default ExamPaperDetails;