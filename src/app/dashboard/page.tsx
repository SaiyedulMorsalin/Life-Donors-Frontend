"use client";

import { useUserStore } from "@/store/userData";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useProfileDetailsQuery } from "@/query/profile";
import { useRouter } from "next/navigation";

const MyRequests = dynamic(() => import("./myRequests"));
const CreateRequest = dynamic(() => import("./createRequest"));
const MyDonations = dynamic(() => import("./myDonations"));

function DashboardPage() {
  const authData = useUserStore((store) => store.userData);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { data } = useProfileDetailsQuery(
    authData ? parseInt(authData.userId!) : undefined,
  );

  useEffect(() => {
    if (!isMounted) return;
    if (!data) return;

    if (
      data.date_of_donation === null ||
      data.gender === "" ||
      data.district === ""
    ) {
      router.push("/profile");
    }
  }, [data, isMounted]);

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && !authData) {
      router.replace("/login");
    }
  }, [authData, isMounted]);

  return (
    <main className="min-h-[85dvh] w-full bg-gray-100">
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
