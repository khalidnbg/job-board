"use server";

import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function createCompany(companyName: string, userId: string) {
  const org = await workos.organizations.createOrganization({
    name: companyName,
  });

  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: "admin",
  });

  return org.id; // Return the organization ID instead of revalidating here
}

// A separate server action for revalidating and redirecting
export async function revalidateAndRedirect() {
  "use server";
  revalidatePath("/new-listing");
  redirect("/new-listing");
}
