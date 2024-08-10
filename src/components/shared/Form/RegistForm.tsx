"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema, TFormSchema } from "@/lib/zod/form.schema";
import { useFormState } from "react-dom";
import { onRegistFormAction } from "@/app/actions/auth.action";
import React from "react";

const RegistForm = () => {
  const [formState, formAction] = useFormState(onRegistFormAction, {
    message: "",
    status: "",
    issues: [],
  });

  React.useEffect(() => {
    if (formState.status === "success") {
      toast.success(formState.message);
    } else if (formState.status === "error") {
      toast.error(formState.message, { duration: 3000 });

      const issues = formState.issues;

      console.log(issues);

      if (issues && issues?.length > 0) {
        issues.forEach((issue) => {
          toast.error(issue, { duration: 3000 });
        });
      }
    }
    console.log(formState);
  }, [formState]);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: TFormSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formAction(formData);

    

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" type="text" {...field} />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" type="text" {...field} />
                </FormControl>
                <FormDescription>This is your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Passwords must be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, and one
                number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your confirm password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Confirm your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" variant={"create"}>
            Submit
          </Button>
        </div>
      </form>
      <Toaster richColors />
    </Form>
  );
};

export default RegistForm;
