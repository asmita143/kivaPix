import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import HeaderSection from "../section/HeaderSection";
import HamburgerMenu from "../utils/HamBurgerMenu";
import React, { useEffect, useState } from "react";
import SideBar from "../section/SideBar";
import { LoadScript } from "@react-google-maps/api";
import AutoCompleteInput from "../utils/AutoComplete";
import useEvent from "../hooks/useEvent";
import useImage from "../hooks/useImage";
import FieldItemTitle from "../utils/FieldItem";
import LoadingIndicator from "../section/LoadingIndicator";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EventForm = () => {
  const { addEvent, eventUpoading } = useEvent();
  const { uploadImage, uploading } = useImage("");
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    location: { name: "", coordinates: { lat: 0, lng: 0 } },
    hostFirstName: "",
    hostLastName: "",
    hostPhone: "",
    hostEmail: "",
    hostCountry: "",
    hostStreetAddress: "",
    hostPostalCode: "",
    hostCity: "",
    interested: false,
    participants: 1,
    coverPhoto: null,
  });
  useEffect(() => {
    const isFormFilled =
      formData.name.trim() !== "" &&
      formData.date.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.location.name.trim() !== "" &&
      formData.hostFirstName.trim() !== "" &&
      formData.hostLastName.trim() !== "" &&
      formData.hostPhone.trim() !== "" &&
      formData.hostEmail.trim() !== "" &&
      formData.hostStreetAddress.trim() !== "" &&
      formData.hostPostalCode.trim() !== "" &&
      formData.hostCity.trim() !== "" &&
      coverPhotoFile !== null;

    setIsDisabled(!isFormFilled);
  }, [formData, coverPhotoFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form inputs before submitting
    const isValid = validateForm();
    if (!isValid) return;

    const eventData = {
      ...formData,
      date: formData.date ? new Date(formData.date) : null,
    };
    const eventId = await addEvent(eventData);

    if (coverPhotoFile && eventId) {
      const path = `coverPhotos/${eventId}`;
      await uploadImage(coverPhotoFile, path);
    }
    // Reset the form fields
    setFormData({
      name: "",
      date: "",
      description: "",
      location: { name: "", coordinates: { lat: 0, lng: 0 } },
      hostFirstName: "",
      hostLastName: "",
      hostPhone: "",
      hostEmail: "",
      hostCountry: "",
      hostStreetAddress: "",
      hostPostalCode: "",
      hostCity: "",
      interested: false,
      participants: 1,
      coverPhoto: null,
    });

    setCoverPhotoFile(null);
  };

  const handleLocationSelect = (selectedLocation: {
    name: string;
    lat: number;
    lng: number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        name: selectedLocation.name,
        coordinates: {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        },
      },
    }));
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhotoFile(e.target.files[0]);
    }
  };
  const validateForm = () => {
    let valid = true;
    const errors = { email: "", phone: "" };

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.hostEmail)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Phone Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.hostPhone)) {
      errors.phone = "Please enter a valid phone number.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      description: "",
      location: { name: "", coordinates: { lat: 0, lng: 0 } },
      hostFirstName: "",
      hostLastName: "",
      hostPhone: "",
      hostEmail: "",
      hostCountry: "",
      hostStreetAddress: "",
      hostPostalCode: "",
      hostCity: "",
      interested: false,
      participants: 1,
      coverPhoto: null,
    });

    setCoverPhotoFile(null);
    setFormErrors({
      email: "",
      phone: "",
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <HeaderSection />
      <div className="flex flex-grow bg-gray-100 ">
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
        <div className="bg-gradient-to-r from-gray-300 to-gray-500 h-auto w-full flex items-center justify-center p-4 ">
          <div className="max-w-4xl min-h-screen mx-auto bg-white p-12 rounded-lg shadow-lg overflow-y-auto ">
            <main
              className={`flex flex-col p-3 w-full min-h-screen transition-all duration-300 ${
                isSidebarVisible ? "lg:ml-64" : "ml-0"
              }`}
            >
              <div className="flex-grow mb-24 p-3 h-auto overflow-y-auto">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-6"
                >
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
                          <FieldItemTitle
                            value={eventTitle}
                            onChange={handleTitleChange}
                            name="title"
                            placeholder="Enter event title"
                            isTextArea={false}
                            row={0}
                          />
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
                            <FieldItemTitle
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              isTextArea={false}
                              row={0}
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
                                location={formData.location}
                                onLocationSelect={handleLocationSelect}
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
                            <FieldItemTitle
                              name="description"
                              value={formData.description}
                              onChange={handleTitleChange}
                              isTextArea={true}
                              row={3}
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
                                    onChange={handleCoverPhotoChange}
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
                      <div className="mt-10 grid">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="hostFirstName"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2">
                            <FieldItemTitle
                              name="hostFirstName"
                              type="text"
                              value={formData.hostFirstName}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
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
                            <FieldItemTitle
                              name="hostLastName"
                              type="text"
                              value={formData.hostLastName}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
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
                            <FieldItemTitle
                              name="hostEmail"
                              type="email"
                              value={formData.hostEmail}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
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
                            <FieldItemTitle
                              name="hostPhone"
                              type="tel"
                              value={formData.hostPhone}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
                            />
                          </div>
                        </div>{" "}
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
                              //onChange={handleTitleChange}
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-200 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            <FieldItemTitle
                              name="hostStreetAddress"
                              type="text"
                              value={formData.hostStreetAddress}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
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
                            <FieldItemTitle
                              name="hostCity"
                              type="text"
                              value={formData.hostCity}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
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
                            <FieldItemTitle
                              name="hostPostalCode"
                              type="text"
                              value={formData.hostPostalCode}
                              onChange={handleTitleChange}
                              isTextArea={false}
                              row={0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isDisabled}
                        className={`rounded-md px-3 py-2 text-sm font-semibold text-white focus:outline-indigo-600 ${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                      >
                        Save
                      </button>
                      ;
                    </div>
                  </div>
                </form>
              </div>
              <LoadingIndicator
                uploading={false}
                copyImage={false}
                deleteLoading={false}
                saving={false}
                event={eventUpoading || uploading}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
