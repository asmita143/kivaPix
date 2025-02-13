import React from "react";
import { FormData } from "../utils/Types";

interface HostDetailsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Corrected the event type here
}

const HostDetails: React.FC<HostDetailsProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="host-details">
      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            First Name
          </label>
          <input
            type="text"
            name="hostFirstName"
            value={formData.hostFirstName}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Last Name
          </label>
          <input
            type="text"
            name="hostLastName"
            value={formData.hostLastName}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="hostEmail"
            value={formData.hostEmail}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Phone:
          </label>
          <input
            type="text"
            name="hostPhone"
            value={formData.hostPhone}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Country
          </label>
          <input
            type="text"
            name="hostCountry"
            value={formData.hostCountry}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Street Address:
          </label>
          <input
            type="text"
            name="hostStreetAddress"
            value={formData.hostStreetAddress}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            City:
          </label>
          <input
            type="text"
            name="hostCity"
            value={formData.hostCity}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4 mb-4">
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-900">
            Postal Code
          </label>
          <input
            type="text"
            name="hostPostalCode"
            value={formData.hostPostalCode}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
export default HostDetails;
