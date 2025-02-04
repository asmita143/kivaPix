import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import HeaderSection from "../section/HeaderSection";
import HamburgerMenu from "../utils/HamBurgerMenu";
import React, { useState } from "react";
import SideBar from "../section/SideBar";
import { LoadScript } from "@react-google-maps/api";
import AutoCompleteInput from "../utils/AutoComplete";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import useEvent from "../hooks/useEvent";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EventForm = () => {
  const { addEvent } = useEvent();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "",
    description: "",
    location: { name: "", coordinates: { lat: 0, lng: 0 } },
    lat: "",
    lng: "",
    hostFirstName: "",
    hostLastName: "",
    hostPhone: "",
    hostEmail: "",
    hostCountry: "",
    hostStreetAddress: "",
    hostPostalCode: "",
    hostCity: "",
    participants: 1,
    coverPhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEvent({
      ...formData,
      date: formData.date ? new Date(formData.date) : null,
    });
    alert("Event added successfully!");
  };
  // Reset form after submission

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <HeaderSection />
      <div className="flex flex-grow bg-gray-100">
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <SideBar />
        </div>
        <main
          className={`flex flex-col p-3 w-full min-h-screen transition-all duration-300 ${
            isSidebarVisible ? "lg:ml-64" : "ml-0"
          }`}
        >
          <div className="flex-grow overflow-auto p-3 max-h-[calc(100vh-4rem)]">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="space-y-12">
                <div className="pb-2">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Create a new event
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Event Name */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Name of Event
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Event name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Event Date */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Date of Event
                      </label>
                      <div className="mt-2">
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Event Location (Google Maps Autocomplete) */}
                    <div className="sm:col-span-4">
                      <label htmlFor="location">Location</label>
                      <div className="mt-2">
                        <LoadScript
                          googleMapsApiKey={apiKey}
                          libraries={["places"]}
                        >
                          <AutoCompleteInput
                            onLocationSelect={function (
                              location:
                                | google.maps.LatLng
                                | google.maps.LatLngLiteral
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        </LoadScript>
                      </div>
                    </div>

                    {/* About the Event */}
                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                          placeholder="Write a few sentences about the event."
                        />
                      </div>
                    </div>

                    {/* Cover Photo Upload */}
                    <div className="col-span-full">
                      <label
                        htmlFor="coverPhoto"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon className="mx-auto h-12 text-gray-300" />
                          <div className="mt-4 flex text-sm text-gray-600">
                            <label
                              htmlFor="coverPhoto"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="coverPhoto"
                                name="coverPhoto"
                                type="file"
                                onChange={handleChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Host Information */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Hosted by
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="hostFirstName"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostFirstName"
                          name="hostFirstName"
                          type="text"
                          value={formData.hostFirstName}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="hostLastName"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostLastName"
                          name="hostLastName"
                          type="text"
                          value={formData.hostLastName}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="hostEmail"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostEmail"
                          name="hostEmail"
                          type="email"
                          value={formData.hostEmail}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="hostPhone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostPhone"
                          name="hostPhone"
                          type="tel"
                          value={formData.hostPhone}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    /{" "}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="hostCountry"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="hostCountry"
                          name="hostCountry"
                          value={formData.hostCountry}
                          //onChange={handleChange}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Finland</option>
                          {/* Add more countries as needed */}
                        </select>
                        <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="hostStreetAddress"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostStreetAddress"
                          name="hostStreetAddress"
                          type="text"
                          value={formData.hostStreetAddress}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="hostCity"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostCity"
                          name="hostCity"
                          type="text"
                          value={formData.hostCity}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="hostPostalCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="hostPostalCode"
                          name="hostPostalCode"
                          type="text"
                          value={formData.hostPostalCode}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventForm;
