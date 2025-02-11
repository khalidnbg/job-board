"use client";

import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/JobActions";
import type { Job } from "@/models/Job";

import "react-country-state-city/dist/react-country-state-city.css";

export default function JobForm({
  orgId,
  jobDoc,
}: {
  orgId: string;
  jobDoc?: Job;
}) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || "");
  const [stateName, setStateName] = useState(jobDoc?.state || "");
  const [cityName, setCityName] = useState(jobDoc?.city || "");

  async function handleSaveJob(data: FormData) {
    data.set("country", countryName.toString());
    data.set("state", stateName.toString());
    data.set("city", cityName.toString());
    data.set("country_id", countryId.toString());
    data.set("state_id", stateId.toString());
    data.set("city_id", cityId.toString());

    data.set("orgId", orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container mt-6 flex flex-col gap-4"
      >
        {jobDoc && <input type="hidden" name="id" value={jobDoc._id} />}
        <TextField.Root
          name="title"
          placeholder="Job title"
          defaultValue={jobDoc?.title || ""}
        />
        {/* work info */}
        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || "onsite"}
              name="remote"
            >
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ""}>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        {/* location */}
        <div className="">
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect
              defaultValue={
                countryId ? { id: countryId, name: countryName } : 0
              }
              onChange={(e: any) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
              defaultValue={stateId ? { id: stateId, name: stateName } : 0}
            />
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
              defaultValue={cityId ? { id: cityId, name: cityName } : 0}
            />
          </div>
        </div>
        {/* company logo & contact info */}
        <div className="sm:flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload
              name="jobIcon"
              icon={faStar}
              defaultValue={jobDoc?.jobIcon || ""}
            />
          </div>

          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload
                  name="contactPhoto"
                  icon={faUser}
                  defaultValue={jobDoc?.contactPhoto || ""}
                />
              </div>

              <div className="grow flex flex-col gap-1">
                <TextField.Root
                  placeholder="John Doe"
                  name="contactName"
                  defaultValue={jobDoc?.contactName || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  type="tel"
                  placeholder="Phone"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  type="email"
                  placeholder="Email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
          placeholder="Job description"
          resize={"vertical"}
          name="description"
          defaultValue={jobDoc?.description || ""}
        />
        <div className="flex justify-center">
          <Button size={"3"}>
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
