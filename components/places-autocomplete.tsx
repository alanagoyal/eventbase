import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import usePlacesAutocomplete from "use-places-autocomplete";
import { UseFormReturn } from "react-hook-form";

interface PlacesAutocompleteProps {
  form: UseFormReturn<any>;
}

export function PlacesAutocomplete({ form }: PlacesAutocompleteProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "OK") return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => (prev < data.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleSelect(data[selectedIndex]);
          }
          break;
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [status, data, selectedIndex]);

  const handleSelect = ({ description }: { description: string }) => {
    setValue(description, false);
    clearSuggestions();
    form.setValue("location", description);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor="location">Location</FormLabel>
          <FormControl>
            <Input
              {...field}
              ref={inputRef}
              id="location"
              className="w-full text-sm"
              disabled={!ready}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                field.onChange(e);
              }}
            />
          </FormControl>
          {status === "OK" && (
            <ul className="mt-2 bg-white border rounded-md shadow-lg">
              {data.map((suggestion, index) => (
                <li
                  key={suggestion.place_id}
                  className={`p-2 cursor-pointer hover:bg-gray-100 text-sm ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}