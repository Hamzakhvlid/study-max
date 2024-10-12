const ExamPaper = require('../models/examPaperModel');
const { uploadOnCloudinary, deleteImage } = require('../utils/cloudinary'); 

exports.addExamPaper = async (req, res) => {
  try {
    const { exam, subject, level, year, paperType, questions } = req.body;

    const pdfFile = req.files?.pdfFile; // Handle PDF upload (if any)
    const markingSchemeFile = req.files?.markingScheme;

    let uploadedPdf = null;
    let uploadedMarkingScheme = null;

    if (pdfFile) {
      uploadedPdf = await uploadOnCloudinary(pdfFile[0].path, 'exam-papers'); // Customize folder if needed
    }

    if (markingSchemeFile) {
      uploadedMarkingScheme = await uploadOnCloudinary(markingSchemeFile[0].path, 'marking-schemes'); 
    }

    const newExamPaper = new ExamPaper({
      exam,
      subject,
      level,
      year,
      paperType, 
      pdfFile: uploadedPdf ? { 
        public_id: uploadedPdf.public_id,
        url: uploadedPdf.url,
      } : null, // Store Cloudinary details
      markingScheme: uploadedMarkingScheme ? { // Store marking scheme details 
        public_id: uploadedMarkingScheme.public_id,
        url: uploadedMarkingScheme.url,
      } : null,
      questions, 
    });

    await newExamPaper.save();
    res.status(201).json({ message: 'Exam paper added successfully', examPaper: newExamPaper });
  } catch (error) {
    console.error('Error adding exam paper:', error);
    res.status(500).json({ error: 'Error adding exam paper' });
  }
};

exports.updateExamPaper = async (req, res) => {
  try {
    const examPaperId = req.params.id;
    const updates = req.body;

    // Handle file updates (PDF and marking scheme) if needed
    const pdfFile = req.files?.pdfFile; 
    const markingSchemeFile = req.files?.markingScheme; 

    if (pdfFile) {
      // Fetch existing exam paper to get old public_id
      const existingExamPaper = await ExamPaper.findById(examPaperId);
      if (existingExamPaper && existingExamPaper.pdfFile.public_id) {
        await deleteImage(existingExamPaper.pdfFile.public_id); // Delete old PDF
      }
      const uploadedPdf = await uploadOnCloudinary(pdfFile[0].path, 'exam-papers');
      updates.pdfFile = {
        public_id: uploadedPdf.public_id,
        url: uploadedPdf.url,
      };
    }

    // Same logic for updating marking scheme file 

    const updatedExamPaper = await ExamPaper.findByIdAndUpdate(
      examPaperId, 
      { $set: updates }, // Use $set to update only provided fields
      { new: true }       // Return the updated document
    );

    if (!updatedExamPaper) {
      return res.status(404).json({ message: 'Exam paper not found' }); 
    }

    res.status(200).json({ 
      message: 'Exam paper updated successfully', 
      examPaper: updatedExamPaper 
    });

  } catch (error) {
    console.error('Error updating exam paper:', error); 
    res.status(500).json({ error: 'Error updating exam paper' });
  }
};


exports.deleteExamPaper = async (req, res) => {
  try {
    const examPaperId = req.params.id;

    // Fetch exam paper to delete associated files from Cloudinary
    const examPaperToDelete = await ExamPaper.findById(examPaperId);

    if (examPaperToDelete) {
      // Delete PDF from Cloudinary (if it exists)
      if (examPaperToDelete.pdfFile && examPaperToDelete.pdfFile.public_id) {
        await deleteImage(examPaperToDelete.pdfFile.public_id); 
      }

      // Delete marking scheme from Cloudinary (if it exists)
      if (examPaperToDelete.markingScheme && examPaperToDelete.markingScheme.public_id) {
        await deleteImage(examPaperToDelete.markingScheme.public_id);
      }

      // Delete exam paper from database 
      await ExamPaper.findByIdAndDelete(examPaperId);
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ message: 'Exam paper not found' }); 
    }

  } catch (error) {
    console.error('Error deleting exam paper:', error); 
    res.status(500).json({ error: 'Error deleting exam paper' }); 
  }
}; 