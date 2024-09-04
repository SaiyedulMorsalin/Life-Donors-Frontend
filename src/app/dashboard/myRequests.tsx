"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useApproveRequestMutation from "@/query/approveRequest";
import { type RequestSchema, useDashboardQuery } from "@/query/dashboard";
import { type UserData } from "@/store/userData";
import { CircleCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { type z } from "zod";
import DonorDetailsPopup from "./donorDetails";

type UserRequestsType = z.infer<typeof RequestSchema>;

type Props = {
  authData: UserData | null;
};

export default function MyRequests({ authData }: Props) {
  const { data, isLoading, isError } = useDashboardQuery({
    authData: authData ? authData : undefined,
  });
  const [loaderItemId, setLoaderItemId] = useState<number | null>(null);
  const [userRequests, setUserRequests] = useState<UserRequestsType[] | null>(
    null,
  );
  const {
    mutate: approve,
    isPending: isPending_approve,
    isSuccess: isSuccess_approve,
    isError: isError_approve,
  } = useApproveRequestMutation();

  const { toast } = useToast();

  function handleClick(id: number) {
    if (!authData) {
      return toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Authentication data not found.",
      });
    }

    setLoaderItemId(id);
    approve({ donorId: authData.userId!, requestId: id });
  }

  useEffect(() => {
    if (isSuccess_approve || isError_approve) {
      setLoaderItemId(null);
    }
  }, [isPending_approve, isSuccess_approve, isError_approve]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Could not get the data from server.",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setUserRequests(data.my_requests);
    }
  }, [data]);

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-2 pb-8 md:grid-cols-2 lg:grid-cols-3 xl:px-0">
      <h2 className="pt-2 text-xl font-semibold">My Requests</h2>
      <Card className="col-span-3 overflow-x-auto p-4 lg:w-auto lg:overflow-x-visible">
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-8">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : userRequests && userRequests?.length > 0 ? (
          <div className="divide w-full space-y-3 divide-y divide-black/15">
            <div className="flex items-start justify-between py-2">
              <p className="w-full min-w-32 flex-1 font-medium">Date</p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Group
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Gender
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                District
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Donor Details
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Status
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Actions
              </p>
            </div>
            <div className="divide flex w-full flex-col-reverse gap-2 divide-y divide-black/15">
              {userRequests?.map((item, index) => (
                <div key={`${item.donor}-${index}`} className="py-2">
                  <div className="flex items-center justify-between">
                    <p className="w-full min-w-32 flex-1">
                      {item.date_of_donation}
                    </p>
                    <p className="w-full min-w-32 flex-1 text-center">
                      {item.blood_group}
                    </p>
                    <p className="w-full min-w-32 flex-1 text-center">
                      {item.gender}
                    </p>
                    <p className="w-full min-w-32 flex-1 text-center">
                      {item.district}
                    </p>
                    <p className="w-full min-w-32 flex-1 text-center">
                      <DonorDetailsPopup
                        donor_id={parseInt(item.accepted_donor_id)}
                        status={item.blood_request_type}
                      />
                    </p>
                    <p className="w-full min-w-32 flex-1 text-center">
                      {item.blood_request_type}
                    </p>
                    <div className="flex w-full min-w-32 flex-1 items-center justify-center">
                      <Button
                        onClick={() => handleClick(item.id)}
                        disabled={
                          item.blood_request_type === "Running" ? false : true
                        }
                        variant={
                          item.blood_request_type === "Running"
                            ? "destructive"
                            : "ghost"
                        }
                        className={cn(
                          "flex items-center justify-center gap-2",
                          item.blood_request_type === "Completed"
                            ? "italic text-green-400"
                            : "",
                        )}
                      >
                        {item.blood_request_type === "Completed" ? (
                          <>
                            <span>Approved</span>
                            <CircleCheck />
                          </>
                        ) : null}

                        {item.blood_request_type === "Pending" ? (
                          <>
                            <span>Unavailable</span>
                          </>
                        ) : null}

                        {item.blood_request_type === "Running" ? (
                          loaderItemId === item.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <span>Approve</span>
                          )
                        ) : null}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No requests are made yet.</p>
        )}
      </Card>
    </div>
  );
}
