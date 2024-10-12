const mongoose = require('mongoose');

const currentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
    unique: true, // Ensures each current type name is unique 
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const CurrentType = mongoose.model('CurrentType', currentTypeSchema);

module.exports = CurrentType;