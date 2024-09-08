"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useProfileDetailsQuery } from "@/query/profile";
import { Loader2, User } from "lucide-react";

type Props = {
  status: string;
  donor_id: number;
};

export default function DonorDetailsPopup({ donor_id, status }: Props) {
  const { data, isLoading, isError } = useProfileDetailsQuery(donor_id);
  const { toast } = useToast();

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: `${label} has been copied to the clipboard`,
        });
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      },
    );
  }

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
        {data ? (
          <div className="rounded-lg bg-white">
            <div className="w-full border-b-0">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <User size={28} />
              </div>
            </div>
            <div className="divide-y divide-black/10 pt-2">
              <div className="flex w-full items-center justify-between py-2 text-sm">
                <p className="font-semibold text-gray-700">Username</p>
                <p className="text-gray-800">{data.user.username}</p>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <p className="font-semibold text-gray-700">Blood Group</p>
                <p className="text-gray-800">{data.blood_group}</p>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <p className="font-semibold text-gray-700">District</p>
                <p className="text-gray-800">{data.district ?? "N/A"}</p>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <p className="font-semibold text-gray-700">Gender</p>
                <p className="text-gray-800">{data.gender ?? "N/A"}</p>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <p className="font-semibold text-gray-700">Available</p>
                <p
                  className={`text-sm font-semibold ${
                    data.is_available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.is_available ? "Yes" : "No"}
                </p>
              </div>
              <div
                onClick={() =>
                  copyToClipboard(data.mobile_number, "Email address")
                }
                className="flex items-center justify-between gap-8 py-2 text-sm hover:cursor-pointer"
              >
                <p className="font-semibold text-gray-700">Email</p>
                <p className="flex-1 overflow-hidden truncate text-gray-800">
                  {data.email ?? "N/A"}
                </p>
              </div>
              <div
                onClick={() =>
                  copyToClipboard(data.mobile_number, "Mobile number")
                }
                className="flex items-center justify-between py-2 text-sm hover:cursor-pointer"
              >
                <p className="font-semibold text-gray-700">Mobile</p>
                <p className="text-gray-800">{data.mobile_number ?? "N/A"}</p>
              </div>
            </div>
          </div>
        ) : null}

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
