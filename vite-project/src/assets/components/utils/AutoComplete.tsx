import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface AutoCompleteInputProps {
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  onLocationSelect: (selectedLocation: {
    name: string;
    lat: number;
    lng: number;
  }) => void;
}

const AutoCompleteInput = ({
  location,
  onLocationSelect,
}: AutoCompleteInputProps) => {
  const [locationName, setLocationName] = useState(location.name);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handles place selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const selectedLocation = {
          name: place.formatted_address || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setLocationName(selectedLocation.name); // Display the formatted address
        onLocationSelect(selectedLocation); // Send structured data
      }
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceSelect}
    >
      <input
        type="text"
        className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
        placeholder="Enter location..."
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />
    </Autocomplete>
  );
};

export default AutoCompleteInput;
