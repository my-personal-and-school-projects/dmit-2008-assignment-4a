export const BASE_URL = "http://localhost:3000";
const JOBS_ENDPOINT = "/api/jobs";
const SAVED_JOBS_ENDPOINT = "/api/saved-jobs";

/**
 *Make a GET request to the API fro the Jobs
 * @param {*} endpoint
 * @returns all jobs from the API
 */
export async function getJobs() {
  try {
    const response = await fetch(`${BASE_URL}${JOBS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    //console.table(data);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 *Make a GET request to the API for the savedJobs
 * @param {*} endpoint
 * @returns all jobs from the API
 */
export async function getSavedJobs() {
  try {
    const response = await fetch(`${BASE_URL}${SAVED_JOBS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    //console.table(data);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 *Make a post request to the API using fetch-then
 * @param {*} jobId
 *
 */
export async function postRequest(jobId) {
  const newJob = { jobId };

  try {
    const response = await fetch(`${BASE_URL}${SAVED_JOBS_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    if (!response.ok) {
      throw new Error("Failed to save job");
    }

    const savedJob = await response.json();
    console.log("Saved Job: ", savedJob);

    return savedJob;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
