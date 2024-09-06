"use client";

import { Card } from "@/components/ui/card";
import { useDashboardQuery } from "@/query/dashboard";
import { type UserData } from "@/store/userData";
import { Loader2 } from "lucide-react";
import DonationItem from "./donationItem";

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
                Receiver
              </p>
              <p className="w-full min-w-32 flex-1 text-center font-medium">
                Status
              </p>
            </div>
            <div className="divide flex w-full flex-col-reverse gap-2 divide-y divide-black/15">
              {data.my_donate?.map((item, index) => (
                <DonationItem
                  key={index + `${item.details.slice(0, 10)}`}
                  item={item}
                />
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
