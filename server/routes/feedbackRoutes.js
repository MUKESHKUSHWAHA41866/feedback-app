// import express from 'express';
// import { getFeedback, submitFeedback } from '../controllers/feedbackController.js';

// const router = express.Router();
// router.get('/', getFeedback);
// router.post('/', submitFeedback);

// export default router;

// server/routes/feedbackRoutes.js
const express = require('express');
const { getFeedback, submitFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.get('/', getFeedback);
router.post('/', submitFeedback);

module.exports = router;

