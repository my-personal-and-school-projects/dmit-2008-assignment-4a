import { useState, useEffect } from "react";

import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";
import LoadingSpinner from "@/components/LoadingSpinner";

import Container from "@mui/material/Container";

import { getJobs } from "@/utils/api/jobs";

const JOBS_ENDPOINT = "/api/jobs";
const SAVED_JOBS_ENDPOINT = "/api/saved-jobs";

//const savedJobs = [];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  //fetch jobs on mount
  useEffect(() => {
    setLoading(true);
    getJobs(JOBS_ENDPOINT)
      .then((data) => {
        console.log("Fetched jobs:", data);
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //fetch saved-jobs on mount
  useEffect(() => {
    setLoading(true);
    getJobs(SAVED_JOBS_ENDPOINT)
      .then((data) => {
        console.log("Fetched jobs:", data);
        setSavedJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <NavBar />
      <Container>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <AvailableJobList
            jobs={jobs}
            savedJobs={savedJobs}
            setSavedJobs={setSavedJobs}
          />
        )}
      </Container>
    </main>
  );
}
