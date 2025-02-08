"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { createCompany } from "../actions/workosActions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function NewListingPage() {
  const { user } = await withAuth();

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return <div className="container">You need to login first</div>;
  }

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (on) => on.status === "active"
  );
  const organizationsNames: { [key: string]: string } = {};
  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <div className="container">
      <div className="">
        <h2 className="text-lg mt-4">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">
          select a company to create a new job add for
        </p>

        <div>
          <div className="border inline-block rounded-md">
            {Object.keys(organizationsNames).map((orgId) => (
              <Link
                key={orgId}
                href={"/new-listing/" + orgId}
                className={
                  "py-2 px-4 flex gap-2 items-center " +
                  (Object.keys(organizationsNames)[0] === orgId
                    ? ""
                    : "border-t")
                }
              >
                {organizationsNames[orgId]}
                <FontAwesomeIcon icon={faArrowRight} className="h-4" />
              </Link>
            ))}
          </div>
        </div>

        {organizationMemberships.data.length === 0 && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
            No company found assigned to your user
          </div>
        )}

        <Link
          href={"/new-company"}
          className="inline-flex gap-2 items-center bg-gray-200 py-2 px-4 rounded-md mt-6"
        >
          Create a new company
          <FontAwesomeIcon icon={faArrowRight} className="h-4" />
        </Link>
      </div>
    </div>
  );
}
