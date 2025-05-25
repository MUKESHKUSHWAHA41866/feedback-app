 

// server/routes/feedbackRoutes.js
const express = require('express');
const { getFeedback, submitFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.get('/', getFeedback);
router.post('/', submitFeedback);

module.exports = router;

