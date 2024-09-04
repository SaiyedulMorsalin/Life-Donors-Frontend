"use client";

import { useUserStore } from "@/store/userData";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyRequests from "./myRequests";
import CreateRequest from "./createRequest";
import MyDonations from "./myDonations";

function DashboardPage() {
  const authData = useUserStore((store) => store.userData);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && !authData) {
      router.replace("/login");
    }
  }, [authData, isMounted]);

  return (
    <main className="min-h-[85dvh] w-full">
      <h2 className="mx-auto max-w-7xl px-2 py-8 text-3xl font-bold xl:px-0">
        Dashboard
      </h2>

      <div className="mx-auto max-w-7xl px-2 pb-8 xl:px-0">
        <CreateRequest authData={authData} />
      </div>
      <MyRequests authData={authData} />
      <MyDonations authData={authData} />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
