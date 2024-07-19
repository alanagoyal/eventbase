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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

const eventFormSchema = z.object({
  event_name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  street_address: z.string().min(1, "Street address is required"),
  city_state_zip: z.string().min(1, "City, state, zip is required"),
  start_time: z.date().min(new Date(), "Start time must be in the future"),
  end_time: z.date().min(new Date(), "End time must be in the future"),
}).refine(data => data.end_time > data.start_time, {
  message: "End time must be after start time",
  path: ["end_time"],
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function EventForm({ guest }: { guest: Guests }) {
  const router = useRouter();
  const supabase = createClient();
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      event_name: "",
      description: "",
      street_address: "",
      city_state_zip: "",
      start_time: setDefaultTime(18), 
      end_time: setDefaultTime(21),   
    },
  });

  async function saveEvent(data: EventFormValues) {
    try {
      const updates = {
        created_at: new Date().toISOString(),
        event_name: data.event_name,
        description: data.description,
        location: `${data.street_address}, ${data.city_state_zip}`, 
        start_timestampz: data.start_time.toISOString(),
        end_timestampz: data.end_time.toISOString(),
        created_by: guest.id,
        event_url: slugify(data.event_name, { lower: true, strict: true }),
      };

      let { error } = await supabase.from("events").insert(updates);
      if (error) throw error;
      toast({ description: "Event created!" });
      setTimeout(() => {
        router.push(`/${updates.event_url}`);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-start min-h-screen p-6 w-1/2">
      <h1 className="text-2xl font-bold py-4">Create Event</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveEvent)}
          className="flex-col justify-between items-center mx-auto w-full pb-2 space-y-2"
          autoComplete="off"  
        >
          <FormField
            control={form.control}
            name="event_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city_state_zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City, State, Zip</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pr-4">Start Time</FormLabel>
                <Popover
                  open={startCalendarOpen}
                  onOpenChange={(open) => setStartCalendarOpen(open)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
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
                <FormLabel className="pr-4">End Time</FormLabel>
                <Popover
                  open={endCalendarOpen}
                  onOpenChange={(open) => setEndCalendarOpen(open)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
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
          <div className="py-2 w-full">
            <Button type="submit" className="w-full">
              Create event
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function setDefaultTime(hours: number): Date {
  const date = new Date();
  date.setHours(hours, 0, 0, 0); // Set minutes, seconds, and milliseconds to 0
  return date;
}