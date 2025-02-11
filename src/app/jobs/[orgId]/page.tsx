import Jobs from "@/app/components/Jobs";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);

  const { user } = await withAuth();

  await mongoose.connect(process.env.MONGO_URI as string);
  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );

  let oms: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }

  for (const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find((o) => o.organizationId === job.orgId);
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-xl my-6 ">{org.name} Jobs</h1>
      </div>

      <Jobs header={"Jobs posted by" + org.name} jobs={jobsDocs} />
    </div>
  );
}
