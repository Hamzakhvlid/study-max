// ./models/examPaperModel.js
const mongoose = require('mongoose');

const examPaperSchema = new mongoose.Schema({
  exam: { 
    type: String, // e.g., 'Leaving Certificate', 'Junior Cycle'
    required: true,
  },
  subject: {
    type: String, 
    required: true,
  },
  level: { 
    type: String, 
    required: true, 
  },
  year: {
    type: Number,
    required: true,
  },
  paperType: { 
    type: String, 
    enum: ['Mock Exam', 'State Exam'],
    required: true, 
  },
  pdfFile: {
    public_id: String, // For Cloudinary storage 
    url: String,
  },
  // Add marking scheme (similar to pdfFile)
  markingScheme: {
    public_id: String, // For Cloudinary storage 
    url: String,
  },
  questions: [{
    chapter: String, 
    questionNumber: Number, 
    questionPart: String, 
    // ... you might store question content, images, etc. here
  }],
});

module.exports = mongoose.model('ExamPaper', examPaperSchema);