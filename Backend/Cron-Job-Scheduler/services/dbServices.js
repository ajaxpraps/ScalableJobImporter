const {jobListModel} = require('../models/jobsListModel');
const {jobImportHistoryModel} = require('../models/jobImportHistoryModel');


const saveJobsDataToDb = async ({api,jobData})=>{
    try {
            await jobListModel.create({
                jobApi: api,
                jobsData: jobData,
            });
            console.log(`📥 Saved feed data for ${api}`);
        } catch (err) {
            console.error(`❌ Failed to save feed for ${api}:`, err);
        }
}

const getPreviousJobsData = async (api) => {
    try {
        const allJobs = await jobListModel.find({ jobApi: api });
        console.log(`📋 Found ${allJobs.length} jobs for API: ${api}`);

        await jobListModel.deleteMany({ jobApi: api });
        console.log(`🗑️ Deleted ${allJobs.length} jobs for API: ${api}`);

        return allJobs;
    } catch (err) {
        console.error(`❌ Error fetching or deleting jobs for API: ${api}`, err);
    }
};

const saveImportHistory = async({api,totalJobs,newJobsCount,updatedJobsCount})=>{
  try {
    // 1. Delete existing entry for that API
    await jobImportHistoryModel.deleteOne({ jobApi: api });

    // 2. Insert new record
    const newEntry = await jobImportHistoryModel.create({
      jobApi: api,
      total: totalJobs,
      new: newJobsCount,
      updated: updatedJobsCount,
      failed: 0
    });

    console.log("✅ Saved job import history:", newEntry);
  } catch (error) {
    console.error("❌ Error saving job import history:", error);
  }

}

module.exports = {saveJobsDataToDb,getPreviousJobsData,saveImportHistory};