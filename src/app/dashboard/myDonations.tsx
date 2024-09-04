"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDashboardQuery } from "@/query/dashboard";
import { type UserData } from "@/store/userData";
import { CircleCheck, Loader2 } from "lucide-react";

type Props = {
  authData: UserData | null;
};

export default function MyDonations({ authData }: Props) {
  const { data, isLoading } = useDashboardQuery({
    authData: authData ? authData : undefined,
  });

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-2 pb-8 md:grid-cols-2 lg:grid-cols-3 xl:px-0">
      <h2 className="pt-2 text-xl font-semibold">My Donations</h2>
      <Card className="col-span-3 p-4">
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-8">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : data && data.my_donate?.length > 0 ? (
          <div className="divide w-full space-y-3 divide-y divide-black/15 overflow-x-auto lg:w-auto lg:overflow-x-visible">
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
                Status
              </p>
            </div>
            <div className="divide flex w-full flex-col-reverse gap-2 divide-y divide-black/15">
              {data.my_donate?.map((item, index) => (
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
                    <div
                      className={cn(
                        "flex w-full min-w-32 flex-1 items-center justify-center gap-2",
                        item.blood_request_type === "Completed"
                          ? "text-green-500"
                          : "",
                      )}
                    >
                      <p>{item.blood_request_type}</p>
                      {item.blood_request_type === "Completed" ? (
                        <CircleCheck />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>You haven&apos;t donated yet.</p>
        )}
      </Card>
    </div>
  );
}
