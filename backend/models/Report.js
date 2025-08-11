const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: { type: String, required: true },
  data: { type: Object, required: true },
  generatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);