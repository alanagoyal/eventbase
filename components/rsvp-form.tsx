import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { DialogClose } from "@/components/ui/dialog";

const rsvpFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(1, "Name is required"),
  company_name: z.string().optional(),
  dietary_restrictions: z.string().optional(),
  discussion_topics: z.string().optional(),
  comments: z.string().optional(),
  rsvp_type: z.enum(["yes", "no", "maybe"], {
    required_error: "Please select an RSVP option",
  }),
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

type Event = Database["public"]["Tables"]["events"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function RsvpForm({
  guest,
  event,
  formattedDate,
  formattedTime,
}: {
  guest: Guest;
  event: Event;
  formattedDate: string;
  formattedTime: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      email: guest?.email || "",
      full_name: guest?.full_name || "",
      company_name: guest?.company_name || "",
      dietary_restrictions: guest?.dietary_restrictions || "",
      discussion_topics: "",
      comments: "",
      rsvp_type: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function sendMail(
    email: string,
    eventInfo: any,
    formattedDate: string,
    formattedTime: string
  ) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          eventInfo,
          formattedDate,
          formattedTime,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async function onRsvp(data: RsvpFormValues) {
    setIsSubmitting(true);
    try {
      const guestInfo = {
        email: data.email,
        full_name: data.full_name,
        company_name: data.company_name,
        dietary_restrictions: data.dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      const rsvpInfo = {
        email: data.email,
        event_id: event.id,
        created_at: new Date().toISOString(),
        comments: data.comments,
        discussion_topics: data.discussion_topics,
        rsvp_type: data.rsvp_type,
      };

      await addGuest(guestInfo);
      await addRsvp(rsvpInfo);
    } catch (error) {
      console.error(error);
      toast({
        title: "Whoops! Something went wrong...",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function addGuest(guestInfo: any) {
    try {
      let { error } = await supabase
        .from("guests")
        .upsert(guestInfo, { onConflict: "email" });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }

  async function addRsvp(rsvpInfo: any) {
    try {
      let { error } = await supabase
        .from("rsvps")
        .upsert(rsvpInfo, { onConflict: "email, event_id" });
      if (error) throw error;

      if (!rsvpInfo.created_at) {
        sendMail(rsvpInfo.email, event, formattedDate, formattedTime);
      }
    } catch (error) {
      throw error;
    } finally {
      toast({
        description: "Your response has been saved!",
      });
      router.refresh();
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onRsvp)}
          className="flex-col justify-between items-center mx-auto pb-2 space-y-2"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    name="email"
                    className="h-10 p-1"
                    disabled={guest ? true : false}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="full_name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="full_name"
                    name="full_name"
                    className="h-10 p-1"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="company_name">Company</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="company_name"
                    name="company_name"
                    className="h-10 p-1"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietary_restrictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dietary_restrictions">
                  Dietary Restrictions
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="dietary_restrictions"
                    name="dietary_restrictions"
                    className="h-10 p-1"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {event.show_discussion_topics && (
            <FormField
              control={form.control}
              name="discussion_topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="discussion_topics">Topics</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="discussion_topics"
                      name="discussion_topics"
                      className="h-10 p-1"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="comments">Comments</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="comments"
                    name="comments"
                    className="h-10 p-1"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rsvp_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="rsvp_type">RSVP</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="rsvp_type" name="rsvp_type">
                      <SelectValue placeholder="Select RSVP" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2 w-full">
            <DialogClose asChild>
              <Button 
                id="submit" 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
}