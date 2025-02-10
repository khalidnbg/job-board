"use client";

import type { Job } from "@/models/Job";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "react-timeago";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm relative">
        <div className="absolute cursor-pointer top-4 right-4">
          <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-300" />
        </div>

        <div className="flex grow gap-4">
          <div className="content-center">
            <img src={jobDoc.jobIcon} alt={jobDoc._id} className="size-12" />
          </div>

          <div className="grow sm:flex">
            <div className="grow">
              <div className="text-gray-500 text-sm">{jobDoc.orgName}</div>
              <div className="font-bold mb-1 text-lg">{jobDoc.title}</div>
              <div className="text-gray-400 text-sm">
                {jobDoc.remote} &middot; {jobDoc.country}, {jobDoc.state},
                {jobDoc.city} &middot; {jobDoc.type}
              </div>
            </div>

            {jobDoc.createdAt && (
              <div className="content-end text-gray-500 text-sm">
                <TimeAgo date={jobDoc.createdAt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
