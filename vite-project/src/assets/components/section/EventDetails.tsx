import React from "react";
import { LoadScript } from "@react-google-maps/api";
import AutoCompleteInput from "../utils/AutoComplete"; // Ensure this component is implemented
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FormData } from "../utils/Types";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface EventDetailsProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleLocationSelect: (AutoCompleteInput: any) => void;
  handleCoverPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  clearImagePreview: () => void;
}

const EventDetails = ({
  formData,
  handleChange,
  handleCoverPhotoChange,
  handleLocationSelect,
  imagePreview,
  clearImagePreview,
}: EventDetailsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
      {/* Event Name */}
      <div className="sm:col-span-4">
        <label className="block text-sm font-medium text-gray-900">
          Event Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter event title"
          className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
        />
      </div>

      {/* Event Date */}
      <div className="sm:col-span-4">
        <label className="block text-sm font-medium text-gray-900">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
        />
      </div>

      {/* Event Location */}
      <div className="sm:col-span-full">
        <label className="block text-sm font-medium text-gray-900">
          Location
        </label>
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
          <AutoCompleteInput
            location={formData.location}
            onLocationSelect={handleLocationSelect}
          />
        </LoadScript>
      </div>

      {/* Event Description */}
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-900">About</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter event description"
          className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
        />
      </div>

      {/* Cover Photo Upload */}
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-900">
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
          {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
            <DeleteOutlined 
               style={{ color:"red", cursor:"pointer"}} 
               onClick={clearImagePreview}
            />
          </>
          ):(
            <>
            <PhotoIcon className="mx-auto h-12 text-gray-300" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  name="coverPhoto"
                  onChange={handleCoverPhotoChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
