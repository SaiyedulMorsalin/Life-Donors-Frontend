"use client";

import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { type BloodDonor, useSearchDonorQuery } from "@/query/searchDonor";
import { useToast } from "@/hooks/use-toast";
import DonorCard from "./donorCard";
import { TooltipProvider } from "@/components/ui/tooltip";

const Search = dynamic(() => import("./Search"), { ssr: false });

function SearchDonorsPage() {
  const { data, isLoading, isError } = useSearchDonorQuery();
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [searchDonors, setSearchDonors] = useState<BloodDonor[] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setDonors(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "An error occurred",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const updateSearchDonors = useCallback((newDonors: BloodDonor[]) => {
    setSearchDonors(newDonors);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchDonors(null);
  }, []);

  const displayedDonors = searchDonors ?? donors;
  const donorCount = displayedDonors.length;

  return (
    <main className="min-h-[85dvh] bg-gray-100">
      <div className="w-full bg-rose-100">
        <Search updateSearchDonors={updateSearchDonors} />
      </div>

      <div className="w-full py-4">
        <div className="mx-auto w-full max-w-7xl space-y-4 px-2 xl:px-0">
          <Button variant="outline" onClick={resetSearch}>
            Reset
          </Button>
          <p className="bg-destructive px-8 py-3 font-semibold text-white lg:py-4">
            {donorCount} {donorCount === 1 ? "donor" : "donors"} found
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              <Loader2 className="ml-8 mt-8 animate-spin" />
            ) : displayedDonors.length > 0 ? (
              displayedDonors.map((donor) => (
                <DonorCard key={donor.email} donor={donor} />
              ))
            ) : (
              <p>No donors found</p>
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
      <TooltipProvider>
        <SearchDonorsPage />
      </TooltipProvider>
    </Suspense>
  );
}
