import React from "react";
import { createCompany } from "../actions/workosActions";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default async function NewCompanyPage() {
  const { user } = await withAuth();

  async function handleNewCompanyFormSubmit(data: FormData) {
    "use server";
    if (user) {
      createCompany(data.get("newCompanyName") as string, user.id);
    }
  }

  if (!user) {
    ("Login to use this page");
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="text-lg mt-6">Create a new company</h2>
          <p className="text-gray-500 text-sm mb-2">
            To create a job listing you need first to register a company
          </p>
        </div>

        <div className="">
          <Link
            href={"/new-listing"}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="h-4 inline-block pr-2"
            />
            Go back
          </Link>
        </div>
      </div>
      <form className="flex gap-2" action={handleNewCompanyFormSubmit}>
        <input
          name="newCompanyName"
          type="text"
          placeholder="company name"
          className="p-2 border border-gray-400 rounded-md"
        />
        <button type="submit" className="bg-gray-200 py-2 px-4 rounded-md">
          create a company
        </button>
      </form>
    </div>
  );
}
