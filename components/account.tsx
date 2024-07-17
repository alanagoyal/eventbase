"use client";

import { useEffect } from "react";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

const accountFormSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  dietary_restrictions: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function Account({ user }: { user: Guests }) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user.email || "",
      full_name: user.full_name || "",
      company_name: user.company_name || "",
      dietary_restrictions: user.dietary_restrictions || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        full_name: user.full_name || "",
        company_name: user.company_name || "",
        dietary_restrictions: user.dietary_restrictions || "",
      });
    }
  }, [user, form]);

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
      toast({ description: "Profile updated!" });
    } catch (error) {
      console.log(error);
      toast({ description: "Failed to update profile" });
    }
  }

  async function SignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="flex flex-col items-start min-h-screen p-6 w-1/2">
      <h1 className="text-2xl font-bold py-4">Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col justify-between items-center mx-auto w-full pb-2 space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10 p-1 w-full" disabled autoComplete="off" />
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
                    <Input {...field} className="h-10 p-1 w-full" autoComplete="off" />
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
                    <Input {...field} className="h-10 p-1 w-full" autoComplete="off" />
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
                    <Input {...field} className="h-10 p-1 w-full" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-1 w-full">
              <div className="py-1 w-full">
                <Button className="w-full" type="submit">Update</Button>
              </div>
              <div className="py-1 w-full">
                <Button className="w-full" variant="secondary" onClick={SignOut}>Sign Out</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
  );
}