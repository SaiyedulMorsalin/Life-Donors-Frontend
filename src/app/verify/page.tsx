import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function VerifyPage() {
  return (
    <div className="space-y-6 py-20 text-center">
      <h2>
        Your account has been created, please check for the verification email
        and verify your email address.
      </h2>
      <p>If you already verified your email, please log in here.</p>
      <Link href={"/login"}>
        <Button variant={"destructive"}>Log in</Button>
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
