import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FormData } from "../utils/Types";
import { DeleteOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [
  "places",
];

interface EventDetailsProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleLocationSelect: (selectedLocation: {
    name: string;
    lat: number;
    lng: number;
  }) => void;
  handleCoverPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  clearImagePreview: () => void;
  isEditing: Boolean;
}

const EventDetails = ({
  formData,
  handleChange,
  handleCoverPhotoChange,
  handleLocationSelect,
  imagePreview,
  clearImagePreview,
  isEditing,
}: EventDetailsProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const [locationName, setLocationName] = useState(formData.location.name);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocationName(e.target.value); // Update location input value
  };

  useEffect(() => {
    setLocationName(formData.location.name);
  }, [formData.location.name]);

  console.log("Image ", imagePreview);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const selectedLocation = {
          name: place.formatted_address || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setLocationName(selectedLocation.name); // Update input field with formatted address
        handleLocationSelect(selectedLocation); // Send structured data
      }
    }
  };

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
      {/* Start Time and End Time */}
      <div className="sm:col-span-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime || ""}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <label className="block text-sm font-medium text-gray-900">
          Number of participants
        </label>
        <input
          type="number"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-4">
        <label className="block text-sm font-medium text-gray-900">
          Contract type
        </label>
        <select
          name="contractType"
          value={formData.contractType}
          onChange={handleChange} // Ensure handleChange supports <select>
          className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
        >
          <option value="">Select contract type</option>
          <option value="Economy">Economy</option>
          <option value="Premium">Premium</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* Event Location */}
      <div className="sm:col-span-full">
        <label className="block text-sm font-medium text-gray-900">
          Location
        </label>
        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              type="text"
              className="mt-2 block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
              placeholder="Enter location..."
              value={locationName}
              onChange={handleLocationInputChange}
            />
          </Autocomplete>
        ) : (
          <p>Loading...</p>
        )}
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
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={clearImagePreview}
                />
              </>
            ) : (
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
                </div>
                <p className="text-xs text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
