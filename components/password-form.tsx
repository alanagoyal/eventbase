"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

type PasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function PasswordTabContent() {
  const supabase = createClient();
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(
      z
        .object({
          password: z.string().min(6, "Password must be at least 6 characters"),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        })
    ),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSetPassword: SubmitHandler<PasswordFormValues> = async (data) => {
    setIsSettingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
      toast({ description: "Password saved!" });
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to set password" });
    } finally {
      setIsSettingPassword(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Set or change your password here</CardDescription>
      </CardHeader>
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onSetPassword)} className="space-y-2">
          <CardContent>
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSettingPassword}>
              {isSettingPassword ? "Setting Password..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}