"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import slugify from "slugify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { toast } from "./ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useLoadScript } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";
import { PlacesAutocomplete } from "./places-autocomplete";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "./spinner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import { formatEventDates } from "@/utils/dates";
import { useCompletion } from "ai/react";

const libraries: Libraries = ["places"];

type Guest = Database["public"]["Tables"]["guests"]["Row"];

const eventFormSchema = z
  .object({
    event_name: z.string().min(1, "Event name is required"),
    description: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    start_time: z.date().min(new Date(), "Start time must be in the future"),
    end_time: z.date().min(new Date(), "End time must be in the future"),
    image: z.any().optional(),
    show_discussion_topics: z.boolean().default(false),
  })
  .refine((data) => data.end_time > data.start_time, {
    message: "End time must be after start time",
    path: ["end_time"],
  });

type EventFormValues = z.infer<typeof eventFormSchema>;
type Event = Database["public"]["Tables"]["events"]["Row"];

export default function EventForm({
  guest,
  existingEvent,
}: {
  guest: Guest;
  existingEvent?: Event;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [useAiImage, setUseAiImage] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [useAiDescription, setUseAiDescription] = useState(false);

  const {
    completion,
    complete,
    isLoading: isGeneratingDescription,
  } = useCompletion({
    api: "/generate-description",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: existingEvent
      ? {
          event_name: existingEvent.event_name || "",
          description: existingEvent.description || "",
          location: existingEvent.location || "",
          start_time: new Date(existingEvent.start_timestampz!),
          end_time: new Date(existingEvent.end_timestampz!),
          image: undefined,
          show_discussion_topics: existingEvent.show_discussion_topics || false,
        }
      : {
          event_name: "",
          description: "",
          location: "",
          start_time: setDefaultTime(18),
          end_time: setDefaultTime(21),
          image: undefined,
          show_discussion_topics: false,
        },
  });

  function setDefaultTime(hours: number): Date {
    const date = new Date();
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  async function generateUniqueEventUrl(eventName: string): Promise<string> {
    let eventUrl = slugify(eventName, { lower: true, strict: true });

    const { data: existingEvents, error: fetchError } = await supabase
      .from("events")
      .select("event_url")
      .eq("event_url", eventUrl);

    if (fetchError) throw fetchError;

    if (existingEvents && existingEvents.length > 0) {
      eventUrl = `${eventUrl}-${uuidv4().slice(0, 8)}`;
    }

    return eventUrl;
  }

  function getGoogleMapsUrl(location: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  }

  async function handleImageUpload(
    event_id: string,
    event_name: string,
    image: File | undefined,
    endTime: Date,
    description: string
  ): Promise<string | null> {
    if (useAiImage) {
      setIsGeneratingImage(true);
      try {
        const response = await fetch("/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: event_id,
            name: event_name,
            description,
            endTime: endTime.toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate and upload AI image");
        }

        const { imageUrl } = await response.json();
        return imageUrl;
      } catch (error) {
        console.error("Error generating or uploading AI image:", error);
        toast({
          description: "Sorry, there was an issue generating your image",
        });
        return null;
      } finally {
        setIsGeneratingImage(false);
      }
    } else {
      if (!(image instanceof File)) return null;

      const filename = `${event_id}`;
      const expiry = Math.floor(
        (endTime.getTime() + 14 * 24 * 60 * 60 * 1000) / 1000
      );

      await supabase.storage.from("images").remove([filename]);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`${filename}`, image, { upsert: true });

      if (uploadError) throw uploadError;

      if (uploadData) {
        const { data, error } = await supabase.storage
          .from("images")
          .createSignedUrl(uploadData.path, expiry);

        if (error) throw error;
        return data?.signedUrl;
      }
      return null;
    }
  }

  async function generateAiDescription(): Promise<void> {
    try {
      const formValues = form.getValues();
      const { formattedDate, formattedTime } = formatEventDates(
        formValues.start_time.toISOString(),
        formValues.end_time.toISOString()
      );
      const prompt = `Generate a short 1-2 sentence description for an event named "${formValues.event_name}" at ${formValues.location} on ${formattedDate} at ${formattedTime}.`;

      const result = await complete(prompt);

      if (result) {
        form.setValue("description", result);
      } else {
        toast({
          description: "Unable to generate a description. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error generating AI description:", error);
      toast({
        description: "Sorry, there was an issue generating the description",
      });
    }
  }

  async function saveEvent(data: EventFormValues) {
    setIsUpdating(true);
    try {
      const eventUrl = existingEvent
        ? existingEvent.event_url
        : await generateUniqueEventUrl(data.event_name);

      const event_id = existingEvent?.id || uuidv4();
      const newImageUrl = await handleImageUpload(
        event_id,
        data.event_name,
        data.image,
        data.end_time,
        data.description || ""
      );

      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const updates: Partial<Event> & {
        id: string;
        event_name: string;
        description: string | undefined;
        location: string;
        start_timestampz: string;
        end_timestampz: string;
        event_url: string;
        location_url: string;
        og_image: string | null;
        show_discussion_topics: boolean;
        timezone: string;
      } = {
        id: event_id,
        event_name: data.event_name,
        description: data.description,
        location: data.location,
        start_timestampz: data.start_time.toISOString(),
        end_timestampz: data.end_time.toISOString(),
        event_url: eventUrl,
        location_url: getGoogleMapsUrl(data.location),
        og_image: newImageUrl || existingEvent?.og_image || null,
        show_discussion_topics: data.show_discussion_topics,
        timezone: userTimezone,
      };

      let { error } = existingEvent
        ? await supabase
            .from("events")
            .update(updates)
            .eq("id", existingEvent.id)
        : await supabase.from("events").insert({
            ...updates,
            created_at: new Date().toISOString(),
            created_by: guest.id,
          });

      if (error) throw error;

      toast({
        description: existingEvent ? "Event updated!" : "Event created!",
      });

      router.push(`/${updates.event_url}`);
      router.refresh();
    } catch (error) {
      toast({
        description: "Sorry, there was an issue saving your event",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteEvent() {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", existingEvent!.id);

      if (error) throw error;
      toast({
        description: "Event deleted successfully!",
      });

      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: "Sorry, there was an issue deleting your event",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        form.setValue("image", acceptedFiles[0]);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col items-center min-h-dvh p-12 md:p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold py-4">
        {existingEvent ? "Edit Event" : "New Event"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveEvent)}
          className="flex-col justify-between items-center mx-auto w-full space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="event_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="event_name">Event Name</FormLabel>
                <FormControl>
                  <Input {...field} id="event_name" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PlacesAutocomplete form={form} existingEvent={existingEvent} />
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start_time">Start Time</FormLabel>
                <Popover
                  open={startCalendarOpen}
                  onOpenChange={(open) => setStartCalendarOpen(open)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="start_time"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          `${field.value.toLocaleString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        ) : (
                          <span>Select Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto" align="end" side="top">
                    <Calendar
                      className="p-0"
                      mode="single"
                      selected={field.value}
                      onSelect={(newDate) => {
                        if (newDate) {
                          const updatedDate = new Date(newDate);
                          updatedDate.setHours(field.value.getHours());
                          updatedDate.setMinutes(field.value.getMinutes());
                          updatedDate.setSeconds(field.value.getSeconds());
                          field.onChange(updatedDate);
                        }
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                    <Input
                      type="time"
                      className="mt-2"
                      value={field.value.toLocaleTimeString([], {
                        hourCycle: "h23",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      onChange={(selectedTime) => {
                        const currentTime = field.value;
                        currentTime.setHours(
                          parseInt(selectedTime.target.value.split(":")[0]),
                          parseInt(selectedTime.target.value.split(":")[1]),
                          0
                        );
                        field.onChange(currentTime);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="end_time">End Time</FormLabel>
                <Popover
                  open={endCalendarOpen}
                  onOpenChange={(open) => setEndCalendarOpen(open)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="end_time"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          `${field.value.toLocaleString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        ) : (
                          <span>Select Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto" align="end" side="top">
                    <Calendar
                      className="p-0"
                      mode="single"
                      selected={field.value}
                      onSelect={(newDate) => {
                        if (newDate) {
                          const updatedDate = new Date(newDate);
                          updatedDate.setHours(field.value.getHours());
                          updatedDate.setMinutes(field.value.getMinutes());
                          updatedDate.setSeconds(field.value.getSeconds());
                          field.onChange(updatedDate);
                        }
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                    <Input
                      type="time"
                      className="mt-2"
                      value={field.value.toLocaleTimeString([], {
                        hourCycle: "h23",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      onChange={(selectedTime) => {
                        const currentTime = field.value;
                        currentTime.setHours(
                          parseInt(selectedTime.target.value.split(":")[0]),
                          parseInt(selectedTime.target.value.split(":")[1]),
                          0
                        );
                        field.onChange(currentTime);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="ai-description"
                      className="text-xs font-normal text-muted-foreground"
                    >
                      Generate with AI
                    </Label>
                    <Switch
                      checked={useAiDescription}
                      onCheckedChange={(checked) => {
                        setUseAiDescription(checked);
                        if (checked) {
                          generateAiDescription();
                        }
                      }}
                      id="ai-description"
                    />
                  </div>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    className="w-full"
                    value={useAiDescription ? completion : field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      if (useAiDescription) {
                        setUseAiDescription(false);
                      }
                    }}
                  />
                </FormControl>
                {isGeneratingDescription && (
                  <div className="text-sm text-muted-foreground">
                    Generating description... this may take a few moments
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="image">Event Image</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="image"
                      className="text-xs font-normal text-muted-foreground"
                    >
                      Generate with AI
                    </Label>
                    <Switch
                      checked={useAiImage}
                      onCheckedChange={setUseAiImage}
                      id="image"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {existingEvent?.og_image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={existingEvent?.og_image}
                        alt="Current event image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <FormControl>
                    {useAiImage ? (
                      <div className="text-sm text-muted-foreground">
                        {isGeneratingImage
                          ? "Generating image... this may take a few moments"
                          : "AI will generate an image based on your event description"}
                      </div>
                    ) : (
                      <div
                        {...getRootProps()}
                        className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer ${
                          isDragActive ? "border-primary" : "border-gray-300"
                        }`}
                      >
                        <input {...getInputProps()} />
                        {field.value ? (
                          <p className="text-sm">
                            File selected: {(field.value as File).name}
                          </p>
                        ) : isDragActive ? (
                          <p className="text-sm">Drop the image here ...</p>
                        ) : (
                          <p className="text-sm">
                            Drag and drop or click to upload
                          </p>
                        )}
                      </div>
                    )}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="show_discussion_topics"
            render={({ field }) => (
              <FormItem>
                <Label>Collect Additional Information</Label>
                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Discussion Topics</FormLabel>
                    <FormDescription>
                      If checked, guests will be asked for discussion topics in
                      their RSVP
                    </FormDescription>
                  </div>
                </div>
              </FormItem>
            )}
          />
          <div className="w-full space-y-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? (
                <>
                  <Spinner.spinner className="mr-2 h-4 w-4 animate-spin" />
                  {existingEvent ? "Updating..." : "Creating..."}
                </>
              ) : existingEvent ? (
                "Update event"
              ) : (
                "Create event"
              )}
            </Button>
            {existingEvent && (
              <Button
                variant="secondary"
                className="w-full"
                disabled={isUpdating || isDeleting}
                onClick={deleteEvent}
              >
                {isDeleting ? (
                  <>
                    <Spinner.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Event"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
