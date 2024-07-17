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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/types/supabase";

const rsvpFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(1, "Name is required"),
  company_name: z.string().optional(),
  dietary_restrictions: z.string().optional(),
  discussion_topics: z.string().optional(),
  comments: z.string().optional(),
  rsvp_type: z.enum(["yes", "no", "maybe"]),
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function RsvpForm({
  guest,
  onRsvp,
}: {
  guest: Guest;
  onRsvp: (data: RsvpFormValues) => void;
}) {
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

  return (
    <div className="pt-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onRsvp)}
          className="flex-col justify-between items-center mx-auto pb-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-10 p-1"
                    disabled={guest ? true : false}
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
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
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
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
                <FormLabel>Dietary Restrictions</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discussion_topics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topics</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10 p-1" />
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
                <FormLabel>RSVP</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
            <Button type="submit" className="w-full">
              Count Me In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}