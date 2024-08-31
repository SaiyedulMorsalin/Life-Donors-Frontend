"use client";

import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MyFormField } from "@/components/MyFormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userData";

type LoginResponse = {
  token: string;
  user_id: string;
};

const FormSchema = z.object({
  userName: z.string({
    required_error: "Please give an username",
  }),
  password: z
    .string({
      required_error: "Please give a password.",
    })
    .min(1, { message: "Please give a password." }),
});

export default function LoginPage() {
  const userData = useUserStore((store) => store.userData);
  const setUserData = useUserStore((store) => store.setUser);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.replace("/profile");
    }
  }, [userData]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(
        "https://life-donors.onrender.com/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.userName,
            password: data.password,
          }),
        },
      );

      if (response.ok) {
        const resData = (await response.json()) as LoginResponse;
        setUserData({
          token: resData.token,
          userId: resData.user_id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-[90dvh] w-full">
      <div className="mx-auto max-w-7xl py-4">
        <Card className="mx-auto max-w-xl px-4 py-4">
          <h2 className="py-4 text-center text-2xl font-semibold">Log In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-start justify-between gap-4"></div>
              <MyFormField
                inputClassName="w-full"
                className="w-full"
                key="userName"
                control={form.control}
                label="Username"
                name="userName"
                placeholder="example@example.com"
                type="userName"
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

              <p className="text-muted-foreground">
                Don&apos;t have an Account?{" "}
                <Link href={"/register"} className="font-semibold underline">
                  register here.
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
