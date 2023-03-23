import { useEffect, useRef } from "react";

interface LocationAutocompleteProps {
  setLocation: (location: string) => void;
  setLocationUrl: (locationUrl: string) => void;
  value: string;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  setLocation,
  setLocationUrl,
  value,
}) => {
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autocompleteInputRef.current) return;
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInputRef.current
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
      if (place.place_id) {
        const locationUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
        setLocationUrl(locationUrl);
      }
    });
  }, []);

  return (
    <input
      ref={autocompleteInputRef}
      id="autocomplete"
      placeholder="Enter your location"
      type="text"
      value={value || ""}
      onChange={(e) => setLocation(e.target.value)}
      className={`h-10 p-1 `}
    />
  );
};

export default LocationAutocomplete;
