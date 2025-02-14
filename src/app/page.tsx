import { fetchLatestJobs } from "./actions/JobActions";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";

export default async function Home() {
  const latestJobs = await fetchLatestJobs();

  return (
    <>
      <Hero />
      <Jobs header="" jobs={latestJobs} />
    </>
  );
}
