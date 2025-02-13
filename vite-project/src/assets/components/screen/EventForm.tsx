import HeaderSection from "../section/HeaderSection";
import HamburgerMenu from "../utils/HamBurgerMenu";
import React, { useEffect, useState } from "react";

import useEvent from "../hooks/useEvent";
import useImage from "../hooks/useImage";
import LoadingIndicator from "../section/LoadingIndicator";
import Sidebar from "../section/SideBar";

import EventDetails from "../section/EventDetails";
import HostDetails from "../section/HostDetails";

const EventForm = () => {
  const { addEvent, eventUpoading } = useEvent();
  const { uploadImage, uploading } = useImage("");
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

    // Update form data for each field dynamically
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the field based on the 'name' attribute
    }));
  };

  //Handle submit of form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      participants: 1,
      coverPhoto: null,
    });

    setCoverPhotoFile(null);
  };

  //Handles location of event
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

  //Handles Cover Photo
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverPhotoFile(file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      // Cleanup previous object URL
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  //Form validation
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

  //Resets the form
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
      participants: 1,
      coverPhoto: null,
    });

    setCoverPhotoFile(null);
    setFormErrors({
      email: "",
      phone: "",
    });
  };

  //Handle cancel
  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-colitems">
      {/* Top Header Section */}
      <HeaderSection />

      {/* Sidebar & Main Layout */}
      <div className="flex flex-grow bg-gray-100 min-h-0">
        {/* Hamburger Menu Button */}
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="bg-gradient-to-r from-gray-300 to-gray-500 flex flex-col items-center justify-center p-2 w-full flex-grow min-h-0 transition-all duration-300">
          {/* Bottom Part: Scrollable Grid View */}
          <div className="overflow-y-auto bg-white rounded-lg shadow-lg p-4 w-full  lg:w-1/3 ">
            <div className="flex gap-6 p-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 w-full items-center"
              >
                <div className="space-y-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Create a new event
                  </h2>
                  <div className="pb-2">
                    <EventDetails
                      formData={formData}
                      handleChange={handleChange}
                      handleCoverPhotoChange={handleCoverPhotoChange}
                      handleLocationSelect={handleLocationSelect}
                    />
                  </div>

                  {/* Host Information */}
                  <div className="border-b border-gray-900/10 pb-9">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                      Hosted by
                    </h2>
                    <div className="mt-10 grid">
                      <HostDetails
                        formData={formData}
                        handleChange={handleChange}
                      />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventForm;
