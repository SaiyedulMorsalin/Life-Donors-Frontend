"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/userData";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";

const RequestSchema = z.object({
  id: z.number(),
  donor: z.string(),
  blood_group: z.string(),
  blood_request_type: z.string(),
  district: z.string(),
  date_of_donation: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  details: z.string(),
  cancel: z.boolean(),
});

const userProfileSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
});

const UserProfileSchemaArray = z.array(userProfileSchema);
type UserProfile = z.infer<typeof userProfileSchema>;
type UserRequestsType = z.infer<typeof RequestSchema>;

const ApiResponseSchema = z.object({
  user_id: z.number(),
  my_requests: z.array(RequestSchema),
});

function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [profile, setProfile] = useState<UserProfile[] | null>(null);
  const authData = useUserStore((store) => store.userData);
  const [userRequests, setUserRequests] = useState<UserRequestsType[] | null>(
    null,
  );

  async function getData() {
    const response_Dashboard = await fetch(
      `https://life-donors.onrender.com/users/dashboard/${authData?.userId}/`,
    );

    const response_Profile = await fetch(
      `https://life-donors.onrender.com/users/profile/${authData?.userId}/`,
    );

    if (response_Dashboard.ok) {
      const data: unknown = await response_Dashboard.json();
      const parsedData = ApiResponseSchema.parse(data);
      setUserRequests(parsedData.my_requests);
    }

    if (response_Profile.ok) {
      const data: unknown = await response_Profile.json();
      const validatedData = UserProfileSchemaArray.parse(data);
      setProfile(validatedData);
    }
  }

  useEffect(() => {
    void getData();
  }, []);

  return (
    <main className="min-h-[85dvh] w-full">
      <h2 className="mx-auto max-w-7xl py-8 text-3xl font-bold">Dashboard</h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pb-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="max-w-lg p-4">
          <h2 className="py-2 text-lg font-semibold">My Requests</h2>
          {userRequests ? (
            userRequests.length > 0 ? (
              <div className="divide space-y-3 divide-y divide-black/15">
                {userRequests.map((item) => (
                  <div key={item.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <p>{item.date_of_donation}</p>
                      <p>{item.blood_request_type}</p>
                      <p>{item.blood_group}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No requests are made yet.</p>
            )
          ) : (
            <div className="flex w-full items-center justify-center py-8">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}
        </Card>
        <Card className="max-w-lg p-4">
          <h2 className="py-2 text-lg font-semibold">My Details</h2>
          {profile ? (
            profile.map((item, index) => (
              <div key={index} className="divide divide-y divide-black/15">
                <div className="flex items-center justify-between py-3">
                  <p>username</p>
                  <p>{item.user}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>blood group</p>
                  <p>{item.blood_group}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>district</p>
                  <p>{item.district ? item.district : "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>available</p>
                  <p>{item.is_available ? "yes" : "no"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center py-8">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}
        </Card>
        <div className="w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="flex items-center justify-center rounded-md border"
          />
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
