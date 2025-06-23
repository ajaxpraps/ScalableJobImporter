

const getNewJobsCount = (oldJobs, newJobs) => {
  const oldJobIds = new Set(oldJobs.map(job => job.id));
  const newOnly = newJobs.filter(job => !oldJobIds.has(job.id));
  return newOnly.length;
};


const isJobUpdated = (oldJob, newJob) => {
    return (
        oldJob.title !== newJob.title ||
        oldJob.description !== newJob.description ||
        oldJob["content:encoded"] !== newJob["content:encoded"] ||
        oldJob["job_listing:location"] !== newJob["job_listing:location"] ||
        oldJob["job_listing:job_type"] !== newJob["job_listing:job_type"]
    );
};

const getUpdatedJobsCount = (oldJobs, newJobs) => {
    const oldJobMap = new Map(oldJobs.map(job => [job.id, job]));

    const updatedJobs = [];

    for (const newJob of newJobs) {
        const oldJob = oldJobMap.get(newJob.id);
        if (oldJob && isJobUpdated(oldJob, newJob)) {
            updatedJobs.push(newJob);
        }
    }

    return updatedJobs.length;
};



module.exports= {getNewJobsCount,getUpdatedJobsCount};