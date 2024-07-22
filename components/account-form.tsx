"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

const accountFormSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  dietary_restrictions: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function AccountTabContent({ user }: { user: Guest }) {
  const supabase = createClient();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user.email || "",
      full_name: user.full_name || "",
      company_name: user.company_name || "",
      dietary_restrictions: user.dietary_restrictions || "",
    },
  });

  async function onSubmit(data: AccountFormValues) {
    try {
      const updates = {
        full_name: data.full_name,
        company_name: data.company_name,
        dietary_restrictions: data.dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from("guests")
        .update(updates)
        .eq("email", user?.email);
      if (error) throw error;
      toast({ description: "Profile saved!" });
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to update profile" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your profile information here
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 p-1 w-full"
                      disabled
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 p-1 w-full"
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
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 p-1 w-full"
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
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 p-1 w-full"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}