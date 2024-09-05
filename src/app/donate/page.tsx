"use client";

import dynamic from "next/dynamic";
import {
  type RequestType,
  useAvailableRequestsQuery,
} from "@/query/availableRequests";
import { Loader2 } from "lucide-react";
import RequestCard from "./requestCard";
import { useUserStore } from "@/store/userData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Search = dynamic(() => import("./search"), { ssr: false });
import { Button } from "@/components/ui/button";
import { useProfileDetailsQuery } from "@/query/profile";

export default function Donate() {
  const userData = useUserStore((state) => state.userData);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const { data, isLoading } = useAvailableRequestsQuery(
    userData?.userId ?? undefined,
  );
  const [searchRequestArray, setSearchRequestArray] = useState<
    RequestType[] | null
  >(null);
  const { data: profileData } = useProfileDetailsQuery(
    userData ? parseInt(userData.userId!) : undefined,
  );

  function updateSearchRequests({ data }: { data: RequestType[] }) {
    setSearchRequestArray(data);
  }

  useEffect(() => {
    if (!isMounted) return;
    if (!profileData) return;

    const info = profileData[0]!;

    if (
      info.date_of_donation === null ||
      info.gender === "" ||
      info.district === ""
    ) {
      router.push("/profile");
    }
  }, [profileData, isMounted]);

  useEffect(() => {
    setIsMounted(true);
    if (!userData && isMounted) {
      router.push("login");
    }
  }, [isMounted, userData]);

  function renderData() {
    if (isLoading || isSearchLoading) {
      return (
        <div className="flex h-full items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    } else if (searchRequestArray !== null && searchRequestArray.length === 0) {
      return (
        <p className="text-center text-gray-500">No search results found.</p>
      );
    } else if (searchRequestArray && searchRequestArray.length > 0) {
      return (
        <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchRequestArray.map((item) => (
            <RequestCard item={item} key={item.id} />
          ))}
        </div>
      );
    } else if (data && data.length > 0) {
      return (
        <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <RequestCard item={item} key={item.id} />
          ))}
        </div>
      );
    } else {
      return (
        <p className="text-center text-gray-500">No requests available.</p>
      );
    }
  }

  return (
    <main className="min-h-[85dvh] bg-white">
      <div className="w-full bg-red-50 py-8">
        <div className="mx-auto max-w-7xl px-2 xl:px-0">
          <Search
            setterFn={updateSearchRequests}
            setIsSearchLoading={setIsSearchLoading}
            isSearchLoading={isSearchLoading}
          />
        </div>
      </div>
      <div className="mx-auto h-full w-full max-w-7xl space-y-4 px-2 pt-4 xl:px-0">
        <Button variant={"outline"} onClick={() => setSearchRequestArray(null)}>
          Reset
        </Button>
        <p className="bg-destructive px-8 py-3 font-semibold text-white lg:py-4">
          {searchRequestArray
            ? `${searchRequestArray.length} requests found`
            : data
              ? `${data.length} requests found`
              : "0 requests found"}
        </p>
        {renderData()}
      </div>
    </main>
  );
}
