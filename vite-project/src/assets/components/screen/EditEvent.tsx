import { useEffect, useState } from "react";
import { db, doc, updateDoc } from "../../../firebase";

import EventDetails from "../section/EventDetails";
import HostDetails from "../section/HostDetails";
import LoadingIndicator from "../section/LoadingIndicator";

import { useNavigate, useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import useImage from "../hooks/useImage";
import EventDialogueModal from "../section/EventDialogueModal";
import SuccessModal from "../section/SuccessModal";
import { MainLayout } from "../layout/MainLayout";

interface EventLocation {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Event {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: EventLocation;
  hostFirstName: string;
  hostLastName: string;
  hostPhone: string;
  hostEmail: string;
  hostCountry: string;
  hostStreetAddress: string;
  hostPostalCode: string;
  hostCity: string;
  participants: number;
  contractType: string;
  coverPhoto: File | null;
}

const EditEvent = () => {
  const { id = "" } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Event>({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
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
    contractType: "",
    coverPhoto: null,
  });

  const { events, deleteEvent } = useEvent();
  const { coverPhotos, fetchCoverPhotos } = useImage("", id);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
  });
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

  useEffect(() => {
    fetchCoverPhotos();
  }, []);

  useEffect(() => {
    if (!id || typeof id !== "string") {
      console.error("Event ID is undefined.");
      setLoading(false);
      return;
    }

    const event = events.find((e) => e.id === id);

    if (event && coverPhotos) {
      console.log("Fetched Event Data:", event); // Log the fetched event data
      console.log("Cover Photos:", coverPhotos); // Log the cover photos data
      const location = event.location || {
        name: "",
        coordinates: { lat: 0, lng: 0 },
      };
      const coordinates = location.coordinates || { lat: 0, lng: 0 };
      console.log("Event Location:", location); // Log the location data

      setFormData({
        name: event.name || "",
        date:
          event.date instanceof Date
            ? event.date.toISOString().split("T")[0]
            : "",
        startTime: event.startTime || "",
        endTime: event.endTime || "",
        description: event.description || "",
        location: {
          name: location.name || "",
          coordinates: {
            lat: coordinates.lat || 0,
            lng: coordinates.lng || 0,
          },
        },
        hostFirstName: event.hostFirstName || "",
        hostLastName: event.hostLastName || "",
        hostPhone: event.hostPhone || "",
        hostEmail: event.hostEmail || "",
        hostCountry: event.hostCountry || "",
        hostStreetAddress: event.hostStreetAddress || "",
        hostPostalCode: event.hostPostalCode || "",
        hostCity: event.hostCity || "",
        participants: event.participants || 1,
        contractType: event.contractType || "",
        coverPhoto: null,
      });
      setImagePreview(coverPhotos[String(event.id)]);
    } else {
      console.log("No such event!");
    }

    setLoading(false);
  }, [id, events, coverPhotos]);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setUpdating(true);
    e.preventDefault();
    if (!id) {
      console.error("Event ID is undefined.");
      return;
    }
    const isValid = validateForm();
    if (!isValid) return;

    const eventRef = doc(db, "Event", id);
    try {
      const updatedEventData = {
        ...formData,
        date: formData.date ? new Date(formData.date) : null,
      };
      await updateDoc(eventRef, updatedEventData);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setUpdating(false);
      navigate(`/event/${id}`);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        coverPhoto: file,
      }));
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDelete = async () => {
    await deleteEvent(id);

    setModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    navigate("/home");
  };

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <MainLayout>
        <div className="bg-gradient-to-r from-gray-300 to-gray-500 flex flex-col items-center justify-center p-2 w-full flex-grow min-h-0 transition-all duration-300">
          <div className="overflow-y-auto bg-white rounded-lg shadow-lg p-4 w-full lg:w-1/3">
            {loading ? (
              <LoadingIndicator
                uploading={false}
                event={true}
                copyImage={false}
                deleteLoading={false}
                saving={false}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 w-full items-center"
              >
                <EventDetails
                  formData={formData}
                  handleChange={handleChange}
                  handleCoverPhotoChange={handleCoverPhotoChange}
                  imagePreview={imagePreview}
                  clearImagePreview={() => setImagePreview(null)}
                  handleLocationSelect={handleLocationSelect}
                  isEditing={true}
                />
                <HostDetails
                  formData={formData}
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
                <div className="mt-6 flex flex-col items-center justify-center gap-y-4">
                  {/* Row for Submit and Cancel buttons */}
                  <div className="flex gap-x-4">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        updating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {updating ? "Updating..." : "Update"}
                    </button>
                  </div>

                  {/* Row for Delete button */}
                  <div className="w-full bg-white p-4 rounded-md shadow-sm">
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => setModalOpen(true)}
                      className={`w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-red-600 shadow-sm  ${
                        updating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Delete this event
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </MainLayout>
      {updating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Updating Event...
            </p>
          </div>
        </div>
      )}
      ;
      <EventDialogueModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleDelete}
        location={formData.location.name || "Unknown location"}
        date={formData.date || "Unknown date"}
        message="delete"
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        message="The event has been successfully deleted."
      />
    </div>
  );
};

export default EditEvent;
