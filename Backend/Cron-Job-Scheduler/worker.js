const { Worker } = require("bullmq");
const IORedis = require('ioredis');
const axios = require('axios');
const xml2js = require('xml2js');
const {saveJobsDataToDb,getPreviousJobsData,saveImportHistory} = require('./services/dbServices');
const {getNewJobsCount,getUpdatedJobsCount} = require('./Helper/historyTracking')
require('./config/db');

const connection = new IORedis({
    maxRetriesPerRequest: null,
});

const worker = new Worker("job-queue", async (job) => {
    console.log('executing job with job Id : ', job.id);
    const api = job.data.url;
    try {
        const response = await axios.get(api, { timeout: 5000 });
        if (response.status !== 200 || !response.data) {
            throw new Error(`Empty or bad response from ${api}`);
        }

        const xml = response.data;
        const parser = new xml2js.Parser({ explicitArray: false });
        const json = await parser.parseStringPromise(xml);
        const jobs = json?.rss?.channel?.item || [];
        const jobData = Array.isArray(jobs) ? jobs : [jobs];

        const savedJobsData = await getPreviousJobsData(api);
        console.log('we got the previous data');
        await saveJobsDataToDb({api,jobData})
        const totalJobs =  jobData.length;
    
     const newJobsCount =  getNewJobsCount(savedJobsData[0].jobsData,jobData);
        const updatedJobsCount = getUpdatedJobsCount(savedJobsData[0].jobsData,jobData);
        console.log('lets see the count');
        console.log(totalJobs,newJobsCount,updatedJobsCount);
        await saveImportHistory({api,totalJobs,newJobsCount,updatedJobsCount});
    } catch (error) {
        console.error(`Error from ${api}:`, error);
    }
}, { connection });