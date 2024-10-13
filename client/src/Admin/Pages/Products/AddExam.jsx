import React, { useState, useEffect, useMemo } from "react";
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
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddExamPaper = () => {
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [paperType, setPaperType] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [markingSchemeFile, setMarkingSchemeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([""]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/subjects`);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to load subjects.");
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subj) => subj.exam === exam);
  }, [subjects, exam]);

  const selectedSubjectLevels = useMemo(() => {
    const selectedSubj = filteredSubjects.find((subj) => subj.name === subject);
    return selectedSubj ? selectedSubj.levels : [];
  }, [filteredSubjects, subject]);

  const handleAddChapter = () => {
    setChapters([...chapters, ""]);
  };

  const handleChapterChange = (index, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = value;
    setChapters(updatedChapters);
  };

  const handleRemoveChapter = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("exam", exam);
    formData.append("subject", subject);
    formData.append("year", year);
    formData.append("paperType", paperType);
    formData.append("pdfFile", pdfFile);
    formData.append("markingScheme", markingSchemeFile);
    formData.append("chapters", JSON.stringify(chapters));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/exam-papers`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      toast.success(response.data.message);

      // Reset form fields
      setExam("");
      setSubject("");
      setLevel("");
      setYear("");
      setPaperType("");
      setPdfFile(null);
      setMarkingSchemeFile(null);
      setChapters([""]);
    } catch (error) {
      console.error("Error adding exam paper:", error);
      toast.error(error.response?.data?.error || "Error adding exam paper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Add Exam Paper
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                onChange={(e) => setExam(e.target.value)}
                required
              >
                <MenuItem value="Leaving Certificate">Leaving Certificate</MenuItem>
                <MenuItem value="Junior Cycle">Junior Cycle</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Subject Select */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="subject-select-label">Subject</InputLabel>
              <Select
                labelId="subject-select-label"
                id="subject-select"
                value={subject}
                label="Subject"
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={!exam}
              >
                {filteredSubjects.map((subj) => (
                  <MenuItem key={subj._id} value={subj.name}>
                    {subj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Year Input */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Grid>

          {/* Paper Type Select */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="paperType-select-label">Paper Type</InputLabel>
              <Select
                labelId="paperType-select-label"
                id="paperType-select"
                value={paperType}
                label="Paper Type"
                onChange={(e) => setPaperType(e.target.value)}
                required
              >
                <MenuItem value="Mock Exam">Mock Exam</MenuItem>
                <MenuItem value="State Exam">State Exam</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* PDF File Input */}
          <Grid item xs={12} md={6}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
          </Grid>

          {/* Marking Scheme File Input */}
          <Grid item xs={12} md={6}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setMarkingSchemeFile(e.target.files[0])}
            />
          </Grid>

          {/* Chapters Input */}
          {chapters.map((chapter, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Chapter ${index + 1} URL`}
                variant="outlined"
                fullWidth
                value={chapter}
                onChange={(e) => handleChapterChange(index, e.target.value)}
                required
              />
              <IconButton onClick={() => handleRemoveChapter(index)}>
                <Delete />
              </IconButton>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button onClick={handleAddChapter} variant="contained">
              Add Another Chapter
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" disabled={loading}>
              Add Exam Paper
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

export default AddExamPaper;
