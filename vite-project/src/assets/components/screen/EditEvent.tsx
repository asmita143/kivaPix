import { useEffect, useState } from "react";
import { db, doc, getDoc, updateDoc } from "../../../firebase";
import { Timestamp } from "firebase/firestore";
import HeaderSection from "../section/HeaderSection";
import HamburgerMenu from "../utils/HamBurgerMenu";
import EventDetails from "../section/EventDetails";
import HostDetails from "../section/HostDetails";
import LoadingIndicator from "../section/LoadingIndicator";
import Sidebar from "../section/SideBar";
import { useParams } from "react-router-dom";

interface EventLocation {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Event {
  id: string;
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
  const { eventId } = useParams<{ eventId: string }>();

  const [formData, setFormData] = useState<Event>({
    id: "",
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

  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        console.error("Event ID is undefined.");
        setLoading(false);
        return;
      }

      try {
        const eventRef = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          setFormData({
            id: eventSnap.id,
            name: eventData.name,
            date: eventData.date ? eventData.date.toDate().toISOString() : "",
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            description: eventData.description,
            location: eventData.location || {
              name: "",
              coordinates: { lat: 0, lng: 0 },
            },
            hostFirstName: eventData.hostFirstName,
            hostLastName: eventData.hostLastName,
            hostPhone: eventData.hostPhone,
            hostEmail: eventData.hostEmail,
            hostCountry: eventData.hostCountry,
            hostStreetAddress: eventData.hostStreetAddress,
            hostPostalCode: eventData.hostPostalCode,
            hostCity: eventData.hostCity,
            participants: eventData.participants,
            contractType: eventData.contractType,
            coverPhoto: null, // Initialize coverPhoto as null
          });
        } else {
          console.log("No such event!");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    const isFormFilled =
      formData.name.trim() !== "" &&
      formData.date !== "" &&
      formData.contractType.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.location.name.trim() !== "" &&
      formData.hostFirstName.trim() !== "" &&
      formData.hostLastName.trim() !== "" &&
      formData.hostPhone.trim() !== "" &&
      formData.hostEmail.trim() !== "" &&
      formData.hostStreetAddress.trim() !== "" &&
      formData.hostPostalCode.trim() !== "" &&
      formData.hostCity.trim() !== "" &&
      formData.coverPhoto !== null;

    setIsDisabled(!isFormFilled);
  }, [formData]);

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
    e.preventDefault();
    if (!eventId) {
      console.error("Event ID is undefined.");
      return;
    }

    const eventRef = doc(db, "events", eventId);
    try {
      const updatedEventData = {
        ...formData,
        date: formData.date ? new Date(formData.date) : null,
      };
      await updateDoc(eventRef, updatedEventData);
      if (formData.coverPhoto) {
        const path = `coverPhotos/${eventId}`;
        await uploadImage(formData.coverPhoto, path);
      }
    } catch (error) {
      console.error("Error updating event:", error);
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

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <HeaderSection />
      <div className="flex flex-grow bg-gray-100 min-h-0">
        <HamburgerMenu setSidebarVisible={() => {}} isSidebarVisible={false} />
        <Sidebar />
        <main className="bg-gradient-to-r from-gray-300 to-gray-500 flex flex-col items-center justify-center p-2 w-full flex-grow min-h-0 transition-all duration-300">
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
                  handleLocationSelect={function (
                    AutoCompleteInput: any
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <HostDetails formData={formData} handleChange={handleChange} />
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => {}}
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
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditEvent;

function uploadImage(coverPhotoFile: File, path: string) {
  throw new Error("Function not implemented.");
}
