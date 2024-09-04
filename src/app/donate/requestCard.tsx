"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAcceptRequestMutation from "@/query/acceptRequest";
import { type RequestType } from "@/query/availableRequests";
import { useUserStore } from "@/store/userData";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  item: RequestType;
};

export default function RequestCard({ item }: Props) {
  const userData = useUserStore((state) => state.userData);
  const { mutate, isPending, isError, error } = useAcceptRequestMutation();
  const router = useRouter();

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
    <Card className="space-y-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
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
      <p className="text-gray-600">{item.details}</p>
      <p className="text-gray-500">
        <strong>District:</strong> {item.district}
      </p>
      <p className="text-gray-500">
        <strong>Request by:</strong> {item.donor.split(" ")[0]}
      </p>
      <p className="text-gray-500">
        <strong>Gender:</strong> {item.gender}
      </p>
      <p className="text-gray-500">
        <strong>Accepted Donor ID:</strong> {item.accepted_donor_id ?? "N/A"}
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
