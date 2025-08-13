// index.js
const fetch = require('node-fetch');

// User preferences
const KEYWORDS = "software developer";
const LOCATION = "remote";

// Dummy job sites (replace with real APIs later)
const JOB_SITES = [
  `https://api.adzuna.com/v1/api/jobs/search?what=${KEYWORDS}&where=${LOCATION}`,
  `https://remotive.io/api/remote-jobs?search=${KEYWORDS}`
];

async function findJobs() {
  console.log(`🔍 Searching for jobs: ${KEYWORDS} in ${LOCATION}...`);
  
  for (const site of JOB_SITES) {
    try {
      const res = await fetch(site);
      const data = await res.json();
      console.log(`✅ Found jobs from ${site}:`, data);
      // TODO: Add auto-apply logic here
    } catch (err) {
      console.error(`❌ Error fetching from ${site}:`, err.message);
    }
  }
}

findJobs();
