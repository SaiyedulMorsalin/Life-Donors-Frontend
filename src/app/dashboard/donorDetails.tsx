"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProfileDetailsQuery } from "@/query/profile";
import { Loader2 } from "lucide-react";

type Props = {
  status: string;
  donor_id: number;
};

export default function DonorDetailsPopup({ donor_id, status }: Props) {
  const { data, isLoading, isError } = useProfileDetailsQuery(donor_id);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={status !== "Pending" ? false : true}
          variant={status === "Pending" ? "ghost" : "outline"}
        >
          {status !== "Pending" ? "Details" : "No donor"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {data
          ? data.map((item, index) => (
              <div
                key={`${item.user}-${index}`}
                className="w-full max-w-2xl divide-y divide-black/10 rounded-lg bg-white"
              >
                <div className="flex w-full items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">Username</p>
                  <p className="text-gray-800">{item.user}</p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">Blood Group</p>
                  <p className="text-gray-800">{item.blood_group}</p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">District</p>
                  <p className="text-gray-800">{item.district || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">Last Donation</p>
                  <p className="text-gray-800">
                    {item.date_of_donation ?? "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">Gender</p>
                  <p className="text-gray-800">{item.gender || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="font-semibold text-gray-700">Available</p>
                  <p
                    className={`text-sm font-semibold ${item.is_available ? "text-green-600" : "text-red-600"}`}
                  >
                    {item.is_available ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            ))
          : null}

        {isLoading ? <Loader2 className="animate-spin" /> : null}
        {isError ? (
          <p className="text-center font-semibold text-rose-500">
            User not found
          </p>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
