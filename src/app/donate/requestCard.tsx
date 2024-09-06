"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import useAcceptRequestMutation from "@/query/acceptRequest";
import { type BloodRequestSchema } from "@/query/availableRequests";
import { useProfileDetailsQuery } from "@/query/profile";
import { useUserStore } from "@/store/userData";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { z } from "zod";

type RequestType = z.infer<typeof BloodRequestSchema>;

type Props = {
  item: RequestType;
};

export default function RequestCard({ item }: Props) {
  const { data: acceptedDonor } = useProfileDetailsQuery(
    parseInt(item.accepted_donor_id!),
  );
  const userData = useUserStore((state) => state.userData);
  const { mutate, isPending, isError, error } = useAcceptRequestMutation();
  const router = useRouter();
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

  function handleClick() {
    if (!userData) return router.push("/login");
    mutate({ donorId: parseInt(userData.userId!), requestId: item.id });
  }

  useEffect(() => {
    if (isError) {
      console.error(isError, error.message);
    }
  }, [isError]);

  return (
    <Card className="flex flex-col items-start justify-between space-y-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">
          {item.blood_group}
        </h3>
        <span
          className={`rounded px-2 py-1 text-sm ${
            item.blood_request_type === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.blood_request_type === "Running"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {item.blood_request_type}
        </span>
      </div>
      <p className="min-h-20 w-full flex-1 rounded-md bg-gray-200/60 p-2 text-gray-600">
        {item.details.split(" ").slice(1).join(" ")}
      </p>
      <p className="text-gray-500">
        <strong>District:</strong> {item.district}
      </p>
      <p className="text-gray-500">
        <strong>Request by:</strong> {item.donor.user.username}
      </p>
      <p className="text-gray-500">
        <strong>Gender:</strong> {item.gender}
      </p>
      <div
        onClick={() =>
          copyToClipboard(acceptedDonor?.email ?? "N/A", "Email address")
        }
        className="flex w-full items-center justify-start gap-2 hover:cursor-help"
      >
        <p className="font-bold text-gray-500">Email:</p>
        <p className="flex-1 truncate text-gray-500">{acceptedDonor?.email}</p>
      </div>
      <p
        onClick={() =>
          copyToClipboard(
            acceptedDonor?.mobile_number ?? "N/A",
            "Mobile number",
          )
        }
        className="text-gray-500 hover:cursor-help"
      >
        <strong>Phone:</strong> {acceptedDonor?.mobile_number}
      </p>
      <Button
        onClick={handleClick}
        disabled={isPending || item.blood_request_type !== "Pending"}
        variant={
          item.blood_request_type === "Pending" ? "destructive" : "default"
        }
        className="mt-4 w-full disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : item.blood_request_type === "Running" ? (
          "Running"
        ) : item.blood_request_type === "Completed" ? (
          "Completed"
        ) : (
          "Accept"
        )}
      </Button>
    </Card>
  );
}
