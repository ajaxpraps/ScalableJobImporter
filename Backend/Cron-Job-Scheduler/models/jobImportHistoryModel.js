const mongoose = require('mongoose');

    const jobImportHistorySchema = new mongoose.Schema({
        jobApi: { type: String, unique: true },
        fetchedAt: { type: Date, default: Date.now },
        total: Number,
        new: Number,
        updated: Number,
        failed: { type: Number, default: 0 }
    });

const jobImportHistoryModel = mongoose.model('JobImportHistory', jobImportHistorySchema);

module.exports = { jobImportHistoryModel };
