import { useState, useEffect } from "react";

import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";
import LoadingSpinner from "@/components/LoadingSpinner";

import Container from "@mui/material/Container";

import { getJobs } from "@/utils/api/jobs";

const savedJobs = [];

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchJobs = async () => {
      try {
        //Delay the call for 2 sec to see the spinner
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const data = await getJobs("/api/jobs");
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
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
            setSavedJobs={() => {
              /* change me! */
            }}
          />
        )}
      </Container>
    </main>
  );
}
