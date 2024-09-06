"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function VerifyPage() {
  const userData = useUserStore((store) => store.userData);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.replace("/dashboard");
    }
  }, [userData]);

  return (
    <div className="min-h-[85dvh] space-y-6 bg-gray-100 py-20 text-center">
      <h2 className="text-2xl font-bold">Your account has been created 🎉</h2>
      <p className="pb-8">
        Please check for the verification email and verify your email address.{" "}
        <br />
        If you already verified your email, please log in here.
      </p>
      <Link href={"/login"} className="pt-6">
        <Button variant={"destructive"} className="px-6">
          Log in
        </Button>
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}
