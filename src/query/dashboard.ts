import { type UserData } from "@/store/userData";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  is_active: z.boolean(),
});

const donorSchema = z.object({
  id: z.number(),
  user: userSchema,
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
  mobile_number: z.string(),
  email: z.string().email(),
});

export const myRequestSchema = z.object({
  donor: donorSchema,
  id: z.number(),
  blood_group: z.string(),
  blood_request_type: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  accepted_donor_id: z.string().nullable(),
  details: z.string(),
});

const myDonateSchema = z.object({
  donor: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string(),
  blood_request_type: z.string(),
  approve_donor_id: z.string(),
  gender: z.string(),
  details: z.string(),
});

const dataSchema = z.object({
  donor_id: z.number(),
  donor_mobile_number: z.string(),
  my_requests: z.array(myRequestSchema),
  my_donate: z.array(myDonateSchema),
});

export function useDashboardQuery({
  authData,
}: {
  authData: UserData | undefined;
}) {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (authData) {
        const response_Dashboard = await fetch(
          `https://life-donors.onrender.com/users/dashboard/${authData.userId}/`,
        );

        const data: unknown = await response_Dashboard.json();
        const parsedData = dataSchema.parse(data);

        return parsedData;
      }
    },
    refetchInterval: 5000,
    enabled: !!authData,
  });

  return { ...query };
}
