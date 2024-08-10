"use server";

import { FormSchema, TFormSchema } from "@/lib/zod/form.schema";

export type FormState = {
  message: string;
  status: "success" | "error";
  issues: string[];
};

export const onRegistFormAction = (prevState: any, formData: FormData) => {
  const rawFormData: TFormSchema = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = FormSchema.safeParse(rawFormData);

  console.log(parsed.error?.issues);

  if (!parsed.success) {
    const errors = parsed.error?.issues;
    const issues = errors.map((error) => error.message);
    return {
      message: "Regist form failed!",
      status: "error",
      issues,
    };
  }

  return {
    message: "Regist form success!",
    status: "success",
  };
};
