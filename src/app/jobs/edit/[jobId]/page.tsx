import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function EditJobPage(pageProps: PageProps) {
  const jobId = pageProps.params.jobId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = await JobModel.findById(jobId);

  if (!jobDoc) {
    return "Not Found";
  }

  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return "You must be logged in";
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });

  if (oms.data.length === 0) {
    return "Access denied";
  }

  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc?.toObject()} />
    </div>
  );
}
