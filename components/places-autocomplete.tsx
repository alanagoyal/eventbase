import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: form.getValues('location'),
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setIsOpen(false);

    form.setValue('location', address);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor="location">Location</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                id="location"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  field.onChange(e.target.value);
                  setIsOpen(true);
                }}
                disabled={!ready}
                placeholder="Search for a location..."
                className="w-full"
              />
            </FormControl>
            {isOpen && status === "OK" && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-auto rounded-md shadow-lg">
                {data.map(({ place_id, description }) => (
                  <li
                    key={place_id}
                    onClick={() => handleSelect(description)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}