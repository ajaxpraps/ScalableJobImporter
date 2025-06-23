const { Queue } = require('bullmq');
const cron = require('node-cron');
const { jobApis } = require('./config/jobsApi');
const { mqConfig } = require('./config/messageQueueConfig')

const jobQueue = new Queue('job-queue', {
  connection: {
    host: '127.0.0.1',
    port: '6379'
  }
});

const fetchAllJobs = async () => {
  for (const url of jobApis) {
    console.log('adding to queue');
    jobQueue.add('jobQueue', { url }, mqConfig);
  }
}
fetchAllJobs();

cron.schedule('0 * * * *', fetchAllJobs);
