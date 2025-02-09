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
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function JobForm() {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  return (
    <Theme>
      <form action={""} className="container mt-6 flex flex-col gap-4">
        <TextField.Root placeholder="Job title" />

        {/* work info */}
        <div className="grid grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root defaultValue="onsite" name="example">
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Full time?
            <RadioGroup.Root defaultValue="full" name="example">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Salary
            <TextField.Root>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        {/* location */}
        <div className="">
          Location
          <div className="flex gap-4 *:grow">
            <CountrySelect
              onChange={(e) => {
                setCountryId(0);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              countryid={countryId}
              onChange={(e) => setStateId(0)}
              placeHolder="Select State"
            />
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => console.log(e)}
              placeHolder="Select City"
            />
          </div>
        </div>

        {/* company logo & contact info */}
        <div className="flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
              <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            </div>
            <div className="mt-2">
              <Button variant="soft">select file</Button>
            </div>
          </div>

          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-2">
              <div>
                <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
                <div className="mt-2">
                  <Button variant="soft">select file</Button>
                </div>
              </div>

              <div className="grow flex flex-col gap-1">
                <TextField.Root placeholder="John Doe">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root type="tel" placeholder="Phone">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root type="email" placeholder="Phone">
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>

        <TextArea placeholder="Job description" resize={"vertical"} />

        <div className="flex justify-center">
          <Button size={"3"}>
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
