import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AutoCompleteInput = () => {
  const [location, setLocation] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handles place selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setLocation(place.formatted_address);
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
        className="border p-2 w-full rounded-md"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </Autocomplete>
  );
};

export default AutoCompleteInput;
