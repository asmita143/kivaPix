import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface AutoCompleteInputProps {
  onLocationSelect: (
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) => void;
}

const AutoCompleteInput = ({ onLocationSelect }: AutoCompleteInputProps) => {
  const [location, setLocation] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handles place selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const selectedLocation = place.geometry.location;
        setLocation(place.formatted_address || ""); // Optionally display formatted address
        // Pass the selected location back to the parent via onLocationSelect
        onLocationSelect(selectedLocation);
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
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </Autocomplete>
  );
};

export default AutoCompleteInput;
