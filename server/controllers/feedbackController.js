 
const Feedback = require('../models/Feedback');

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
    .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitFeedback = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newFeedback = await Feedback.create({ name, email, message });
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getFeedback,
  submitFeedback,
};

