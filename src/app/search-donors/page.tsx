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
            className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <UserRound
              size={50}
              className="w-[20%] min-w-[50px] text-destructive"
            />
            <div className="w-full flex-1 space-y-2">
              <div className="flex items-start justify-start">
                <p className="w-[30%] font-medium text-gray-700">Name</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.user}
                </p>
              </div>
              <div className="flex items-start justify-start">
                <p className="w-[30%] font-medium text-gray-700">Group</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.blood_group}
                </p>
              </div>
              <div className="flex items-start justify-start">
                <p className="w-[30%] font-medium text-gray-700">District</p>
                <p className="flex-1 pl-2 font-semibold text-gray-800">
                  {item.district || "N/A"}
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
          className="flex items-center space-x-6 rounded-xl border border-gray-300 bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <UserRound size={60} className="w-[15%] min-w-[60px] text-red-500" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Name:</p>
              <p className="text-base font-semibold text-gray-900">
                {item.user}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">Blood Group:</p>
              <p className="text-base font-semibold text-gray-900">
                {item.blood_group}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">District:</p>
              <p className="text-base font-semibold text-gray-900">
                {item.district.charAt(0).toUpperCase() +
                  item.district.slice(1) || "N/A"}
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
          <p className="bg-destructive px-8 py-4 font-semibold text-white">
            {searchDonors
              ? `${searchDonors.length} donors found`
              : donors
                ? `${donors.length} donors found`
                : "0 donors found"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? <Loader2 className="animate-spin" /> : showDonorList()}
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
