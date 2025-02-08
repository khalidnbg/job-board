import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function NewListingPage() {
  const { user } = await withAuth();

  return (
    <div className="container">
      {!user && <div>login</div>}
      {user && (
        <div className="">
          <h2 className="text-lg mt-4">Your companies</h2>
          <p className="text-gray-500 text-sm mb-2">
            select a company to create a new job add for
          </p>

          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
            No company found assigned to your user
          </div>

          <h2 className="text-lg mt-6">Create a new company</h2>
          <p className="text-gray-500 text-sm mb-2">
            To create a job listing you need first to register a company
          </p>
          <form action="" className="flex gap-2">
            <input
              type="text"
              placeholder="company name"
              className="p-2 border border-gray-400 rounded-md"
            />
            <button className="flex gap-2 items-center bg-gray-200 py-2 px-4 rounded-md">
              create a company
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
