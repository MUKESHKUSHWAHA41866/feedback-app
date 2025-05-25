// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import feedbackRoutes from './routes/feedbackRoutes.js';

// dotenv.config();
// const app = express();

// connectDB();
// app.use(cors());
// app.use(express.json());

// app.use('/api/feedback', feedbackRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Job Application Tracker API 🚀');
});

app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

