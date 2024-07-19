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
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const libraries: Libraries = ["places"];

type Guests = Database["public"]["Tables"]["guests"]["Row"];

const eventFormSchema = z.object({
  event_name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  start_time: z.date().min(new Date(), "Start time must be in the future"),
  end_time: z.date().min(new Date(), "End time must be in the future"),
}).refine(data => data.end_time > data.start_time, {
  message: "End time must be after start time",
  path: ["end_time"],
});

type EventFormValues = z.infer<typeof eventFormSchema>;
type Event = Database["public"]["Tables"]["events"]["Row"];

export default function EventForm({ 
  guest, 
  existingEvent, 
  onEventSaved 
}: { 
  guest: Guests; 
  existingEvent?: Event;
  onEventSaved?: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

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
        }
      : {
          event_name: "",
          description: "",
          location: "",
          start_time: setDefaultTime(18),
          end_time: setDefaultTime(21),
        },
  });

  function setDefaultTime(hours: number): Date {
    const date = new Date();
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  async function saveEvent(data: EventFormValues) {
    try {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`;

      const updates = {
        event_name: data.event_name,
        description: data.description,
        location: data.location,
        start_timestampz: data.start_time.toISOString(),
        end_timestampz: data.end_time.toISOString(),
        event_url: slugify(data.event_name, { lower: true, strict: true }),
        location_url: googleMapsUrl,
      };

      let { error } = existingEvent
        ? await supabase.from("events").update(updates).eq("id", existingEvent.id)
        : await supabase.from("events").insert({ ...updates, created_at: new Date().toISOString(), created_by: guest.id });

      if (error) throw error;
      toast({ description: existingEvent ? "Event updated!" : "Event created!" });
      if (onEventSaved) {
        onEventSaved();
      }
      setTimeout(() => {
        router.push(`/${updates.event_url}`);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }

  if (!isLoaded) return null;

  return (
    <div className={`flex flex-col ${existingEvent ? 'items-start p-6' : 'items-start min-h-screen p-6 w-1/2'}`}>
      {!existingEvent && (
        <h2 className="text-2xl font-bold py-4">Create a New Event</h2>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveEvent)}
          className={`flex-col justify-between items-center ${existingEvent ? 'mx-auto' : 'max-w-md'} w-full pb-2 space-y-4`}
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea {...field} id="description" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PlacesAutocomplete form={form} />
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
                  <PopoverContent>
                    <Calendar
                      className="p-0"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
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
                  <PopoverContent>
                    <Calendar
                      className="p-0"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
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
          <div className="w-full">
            <Button type="submit" className="w-full">
              {existingEvent ? "Update event" : "Create event"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}