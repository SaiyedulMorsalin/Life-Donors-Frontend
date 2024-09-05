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
import { Suspense, useEffect } from "react";
import { useUserStore } from "@/store/userData";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import LoginImg from "@/assets/images/login.png";
import { useLoginMutation } from "@/query/login";

const FormSchema = z.object({
  userName: z.string().min(1, { message: "Please give an username" }),
  password: z.string().min(1, { message: "Please give a password" }),
});

function LoginPage() {
  const { mutate, isPending, isSuccess, isError } = useLoginMutation();
  const { toast } = useToast();
  const userData = useUserStore((store) => store.userData);
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

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please make sure credentials are correct.",
      });
    }

    if (isSuccess) {
      toast({
        title: "Login successful",
        description: "You are now logged in...!",
      });
    }
  }, [isError, isSuccess]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({ password: data.password, username: data.userName });
  }

  return (
    <main className="min-h-[90dvh] w-full">
      <div className="mx-auto flex min-h-[90dvh] w-full max-w-7xl items-center justify-center py-4">
        <div className="mx-auto w-full px-4 py-4">
          <h2 className="py-8 text-center text-2xl font-semibold">
            Welcome back 👋
          </h2>
          <Card className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-8 px-8 py-12 sm:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
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
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="pointer-events-none hidden rounded-md bg-gray-950/5 sm:block">
              <Image
                alt=""
                src={LoginImg}
                placeholder="blur"
                className="pointer-events-none"
              />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
