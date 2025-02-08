import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await withAuth();
  if (!user) return "please log in";

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const orgId = props.params.orgId;

  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });

  const hasAccess = oms.data.length > 0;

  if (!hasAccess) return "no access";

  return (
    <form action={""} className="container mt-6">
      <input type="text" className="border p-2" placeholder="job title" />
    </form>
  );
}
