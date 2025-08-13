// index.js
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');

// User preferences
const KEYWORDS = 'software developer';
const LOCATION = 'remote';
const MAX_JOBS_PER_SITE = 10;

// Free remote job APIs
const JOB_APIS = [
  { name: 'remotive', url: `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(KEYWORDS)}&location=${encodeURIComponent(LOCATION)}` },
  // You can add more free APIs here following the same structure
];

// Store application count per website
const applicationsCount = {};

// Fetch jobs from APIs
async function fetchJobs() {
  let allJobs = [];
  for (const api of JOB_APIS) {
    try {
      const res = await fetch(api.url);
      const data = await res.json();
      let jobs = [];

      // Parse Remotive jobs
      if (api.name === 'remotive' && data.jobs) {
        jobs = data.jobs.map(job => ({
          title: job.title,
          company: job.company_name,
          url: job.url,
          site: api.name
        }));
      }

      // You can add parsers for other APIs here

      allJobs = allJobs.concat(jobs);
    } catch (err) {
      console.error(`Error fetching from ${api.name}:`, err.message);
    }
  }
  return allJobs;
}

// Puppeteer auto-apply skeleton
async function autoApply(job) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(job.url, { waitUntil: 'networkidle2' });

    // Example form filling - adjust selectors per site
    // This works only if the site has input fields with these IDs
    // Otherwise, inspect the form and update selectors
    await page.type('#name', 'Your Name');
    await page.type('#email', 'youremail@example.com');
    await page.type('#resume', '/path/to/resume.pdf'
