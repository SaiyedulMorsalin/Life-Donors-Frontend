"use client";

import { Card } from "@/components/ui/card";
import { Loader2, UserRound } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { type BloodDonor, useSearchDonorQuery } from "@/query/searchDonor";
import { useToast } from "@/hooks/use-toast";
const Search = dynamic(() => import("./Search"), { ssr: false });

function SearchDonorsPage() {
  const { data, isLoading, isError } = useSearchDonorQuery();
  const [donors, setDonors] = useState<BloodDonor[]>();
  const [searchDonors, setSearchDonors] = useState<BloodDonor[] | null>(null);
  const { toast } = useToast();

  function updateSearchDonors(donors: BloodDonor[]) {
    setSearchDonors(donors);
  }

  useEffect(() => {
    if (data) {
      setDonors(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Some error happened",
        description: "Something went wrong, Please try again.",
      });
    }
  }, [isError]);

  function showDonorList() {
    if (searchDonors) {
      return searchDonors.length > 0 ? (
        searchDonors.map((item, index) => (
          <Card
            key={index}
            className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-rose-800">
              <UserRound size={50} className="text-destructive" />
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">Name</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.user}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">Blood Group</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.blood_group}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">District</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.district || "N/A"}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">Gender</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.gender}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">
                  Availability
                </p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.is_available ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">Email</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.email ? item.email : "N/A"}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="w-[30%] font-medium text-gray-700">Mobile</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.mobile_number ? item.mobile_number : "N/A"}
                </p>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p>No data found</p>
      );
    }

    return donors ? (
      donors.map((item, index) => (
        <Card
          key={index}
          className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        >
          <div className="flex size-20 items-center justify-center rounded-full bg-rose-100">
            <UserRound size={50} className="text-destructive" />
          </div>
          <div className="w-full divide-y divide-black/5">
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Name</p>
              <p className="pl-2 font-semibold text-gray-800">{item.user}</p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Blood Group</p>
              <p className="pl-2 font-semibold text-gray-800">
                {item.blood_group}
              </p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">District</p>
              <p className="pl-2 font-semibold text-gray-800">
                {item.district || "N/A"}
              </p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Gender</p>
              <p className="pl-2 font-semibold text-gray-800">{item.gender}</p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Availability</p>
              <p className="pl-2 font-semibold text-gray-800">
                {item.is_available ? "Available" : "Not Available"}
              </p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Email</p>
              <p className="pl-2 font-semibold text-gray-800">
                {item.email ? item.email : "N/A"}
              </p>
            </div>
            <div className="flex items-start justify-between py-2">
              <p className="font-medium text-gray-700">Mobile</p>
              <p className="pl-2 font-semibold text-gray-800">
                {item.mobile_number ? item.mobile_number : "N/A"}
              </p>
            </div>
          </div>
        </Card>
      ))
    ) : (
      <p>No data found</p>
    );
  }

  return (
    <main className="min-h-[85dvh]">
      <div className="w-full bg-rose-50">
        <Search updateSearchDonors={updateSearchDonors} />
      </div>

      <div className="w-full py-4">
        <div className="mx-auto w-full max-w-7xl space-y-4 px-2 xl:px-0">
          <Button variant={"outline"} onClick={() => setSearchDonors(null)}>
            Reset
          </Button>
          <p className="bg-destructive px-8 py-3 font-semibold text-white lg:py-4">
            {searchDonors
              ? `${searchDonors.length} donors found`
              : donors
                ? `${donors.length} donors found`
                : "0 donors found"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              <Loader2 className="ml-8 mt-8 animate-spin" />
            ) : (
              showDonorList()
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchDonorsPage />
    </Suspense>
  );
}
