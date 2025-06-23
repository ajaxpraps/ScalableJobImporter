const mongoose = require('mongoose');

const jobsListSchema = new mongoose.Schema({
  jobApi: { type: String, unique: true },
  jobsData: { type: mongoose.Schema.Types.Mixed, default: null }, 
});

const jobListModel = mongoose.model('JobsListSchema', jobsListSchema);

module.exports = {jobListModel};