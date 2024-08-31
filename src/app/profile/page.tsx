"use client";

import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/userData";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";

const userProfileSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
});

const apiResponseSchema = z.array(userProfileSchema);

type UserProfile = z.infer<typeof userProfileSchema>;

function ProfilePage() {
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);
  const [profile, setProfile] = useState<UserProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(
          `https://life-donors.onrender.com/users/profile/${id}/`,
        );
        const data: unknown = await response.json();

        // Validate the data using our Zod schema
        const validatedData = apiResponseSchema.parse(data);
        setProfile(validatedData);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError("Data validation error: " + err.message);
        } else if (err instanceof Error) {
          setError("Fetch error: " + err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    if (isMounted) {
      if (!userData) {
        return router.push("/login");
      }

      if (userData.userId !== null) {
        void fetchData(userData.userId);
      }
    }
  }, [userData, isMounted]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-[85dvh]">
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-7xl py-8 text-center text-3xl font-bold">
          My Profile
        </h2>
        <div className="flex items-center justify-center">
          {profile ? (
            profile.map((profile, index) => (
              <Card key={index} className="w-full max-w-xl p-4">
                <div className="flex items-center justify-between py-3">
                  <p>Username</p>
                  <p>{profile.user}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Blood Group</p>
                  <p>Blood Group: {profile.blood_group}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>District</p>
                  <p>District: {profile.district || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Last Donation</p>
                  <p>{profile.date_of_donation ?? "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Gender</p>
                  <p>Gender: {profile.gender || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Available</p>
                  <p>Available: {profile.is_available ? "Yes" : "No"}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-8">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
