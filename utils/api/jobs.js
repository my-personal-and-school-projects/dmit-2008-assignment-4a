const BASE_URL = "http://localhost:3000";

/**
 *Make a GET request to the API
 * @param {*} endpoint
 * @returns all jobs from the API
 */
export async function getJobs(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("No jobs found");
    }
    const data = await response.json();

    //console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}
