import { useState, useEffect, useContext, createContext } from "react";
import { getJobs, getSavedJobs } from "@/utils/api/jobs";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jobsData = await getJobs();
        const savedJobsData = await getSavedJobs();

        setJobs(jobsData);
        setSavedJobs(savedJobsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <JobsContext.Provider value={{ loading, jobs, savedJobs, setSavedJobs }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
