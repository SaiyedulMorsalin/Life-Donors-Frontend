"use client";

import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MyFormField } from "@/components/MyFormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useUserStore } from "@/store/userData";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z
  .object({
    userName: z
      .string({
        required_error: "Please give a username.",
      })
      .min(1, { message: "Please give a username." }),
    firstName: z
      .string({
        required_error: "Please give a first name.",
      })
      .min(1, { message: "Please give a first name." }),
    lastName: z
      .string({
        required_error: "Please give a last name.",
      })
      .min(1, { message: "Please give a last name." }),
    email: z
      .string({
        required_error: "Please give an email",
      })
      .email(),
    phone: z
      .string({
        required_error: "Please give a valid number",
      })
      .min(10, { message: "Please give a valid number" }),
    group: z
      .string({
        required_error: "Please select a blood group.",
      })
      .min(1, { message: "Please select a blood group." }),
    password: z
      .string({
        required_error: "Please give a password.",
      })
      .min(1, { message: "Please give a password." }),
    confirmPassword: z
      .string({
        required_error: "Please confirm password.",
      })
      .min(1, { message: "Please confirm password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

function RegisterPage() {
  const { toast } = useToast();
  const userData = useUserStore((state) => state.userData);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (userData) {
      router.replace("/dashboard");
    }
  }, [userData]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(
        "https://life-donors.onrender.com/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.userName,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            mobile_number: data.phone,
            blood_group: data.group,
            password: data.password,
            confirm_password: data.confirmPassword,
          }),
        },
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "something went wrong",
          description: "Username or Email is already taken.",
        });
      }

      if (response.ok) {
        toast({
          title: "Congrats 🎉🎉",
          description: "Please check your email for verification link.",
        });

        router.push("/verify");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "something went wrong",
          description: `${error.message}`,
        });
      }
    }
  }

  return (
    <main className="min-h-[90dvh] w-full">
      <div className="mx-auto max-w-7xl py-4">
        <Card className="mx-auto max-w-xl px-4 py-4">
          <h2 className="py-4 text-center text-2xl font-semibold">Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <MyFormField
                  inputClassName="w-full"
                  className="w-full"
                  key="firstName"
                  control={form.control}
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  type="text"
                />
                <MyFormField
                  inputClassName="w-full"
                  className="w-full"
                  key="lastName"
                  control={form.control}
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <MyFormField
                  inputClassName="w-full flex-1"
                  className="flex-1"
                  key="userName"
                  control={form.control}
                  label="Username"
                  name="userName"
                  placeholder="johndoe"
                  type="text"
                />
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel>Blood group</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Blood Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <MyFormField
                inputClassName="w-full"
                className="w-full"
                key="email"
                control={form.control}
                label="Email"
                name="email"
                placeholder="example@example.com"
                type="email"
              />
              <MyFormField
                inputClassName="w-full"
                className="w-full"
                key="phone"
                control={form.control}
                label="Phone"
                name="phone"
                placeholder="123-456-7890"
                type="tel"
              />

              <MyFormField
                inputClassName="w-full"
                className="w-full"
                key="password"
                control={form.control}
                label="Password"
                name="password"
                placeholder="••••••••"
                type="password"
              />
              <MyFormField
                inputClassName="w-full"
                className="w-full"
                key="confirmPassword"
                control={form.control}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="••••••••"
                type="password"
              />

              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href={"/login"} className="font-semibold underline">
                  log in here.
                </Link>
              </p>

              <div className="flex w-full items-center justify-end">
                <Button className="bg-destructive" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}
