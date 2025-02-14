"use server";

import { addOrgAndUserData, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);

  const { id, ...jobData } = Object.fromEntries(formData);
  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData);

  if ("orgId" in jobData) {
    revalidatePath(`/jobs/${jobData?.orgId}`);
  }

  return JSON.parse(JSON.stringify(jobDoc));
}

export async function fetchLatestJobs() {
  const { user } = await withAuth();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    user
  );
  return latestJobs;
}
