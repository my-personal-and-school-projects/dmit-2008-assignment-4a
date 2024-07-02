import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { postRequest } from "@/utils/api/jobs";
import { useEffect, useState } from "react";

export default function JobItem({ job, savedJobs, setSavedJobs }) {
  const [isJobSaved, setIsJobSaved] = useState(false);

  useEffect(() => {
    const isSaved = savedJobs.some((savedJob) => savedJob.jobId === job.id);
    if (isSaved) {
      setIsJobSaved(true);
    }
  }, [savedJobs, job.id]);
  const handleClick = async () => {
    try {
      await handleSaveJob(job.id, savedJobs, setSavedJobs);
      setIsJobSaved(true);
      console.log("Job saved");
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };
  return (
    <>
      <Card variant="outlined" sx={{ marginBottom: 2, width: "90%" }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h6" component="div">
              {job.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              component="div"
            >
              {job.job_type} • {job.location}
            </Typography>
          </Stack>
          <Typography variant="body1">Description</Typography>
          <Typography color="text.secondary" variant="body2">
            {job.description}
          </Typography>
          <Typography sx={{ marginTop: 1 }} variant="body1">
            Qualifications
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {job.qualifications}
          </Typography>
          <CardActions
            sx={{ justifyContent: "flex-end", padding: 0, marginTop: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<BookmarkIcon />}
              disabled={isJobSaved}
              onClick={handleClick}
            >
              {isJobSaved ? "Saved" : "Save for Later"}
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}

/**
 * Handle saving the job to the saved-jobs endpoint using the POST request
 * @param {*} jobId
 * @param {*} savedJobs
 * @param {*} setSavedJobs
 */
async function handleSaveJob(jobId, savedJobs, setSavedJobs) {
  try {
    const savedJob = await postRequest(jobId);
    console.log("Saved job:", savedJob);

    if (savedJob) {
      setSavedJobs([...savedJobs, savedJob]);
    } else {
      console.log("Undefined job");
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
}
