// import mongoose from 'mongoose';

// const feedbackSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
// }, { timestamps: true });

// export default mongoose.model('Feedback', feedbackSchema);


// server/models/feedbackModel.js

// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);


const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    set: v => sanitizeHtml(v),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    set: v => sanitizeHtml(v),
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
    set: v => sanitizeHtml(v),
  },
}, { timestamps: true });

// Optional: create index to prevent spam
feedbackSchema.index({ email: 1, createdAt: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);

