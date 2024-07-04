import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import Container from "@mui/material/Container";
import { useJobs } from "@/context/JobsContext";

export default function Home() {
  const { loading, jobs } = useJobs();
  return (
    <main>
      <NavBar />
      <Container>
        {loading ? <LoadingSpinner /> : <AvailableJobList jobs={jobs} />}
      </Container>
    </main>
  );
}
