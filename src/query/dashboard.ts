import { type UserData } from "@/store/userData";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const RequestSchema = z.object({
  id: z.number(),
  blood_group: z.string(),
  blood_request_type: z.string(),
  date_of_donation: z.string().nullable(),
  details: z.string(),
  district: z.string(),
  donor: z.string(),
  accepted_donor_id: z.string(),
  gender: z.enum(["Male", "Female"]),
});

const DonateSchema = z.object({
  donor: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string(),
  blood_request_type: z.string(),
  gender: z.enum(["Male", "Female"]),
  details: z.string(),
});

const ApiResponseSchema = z.object({
  donor_id: z.number(),
  my_requests: z.array(RequestSchema).nullable(),
  my_donate: z.array(DonateSchema),
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
        const parsedData = ApiResponseSchema.parse(data);

        return parsedData;
      }
    },
    refetchInterval: 5000,
    enabled: !!authData,
  });

  return { ...query };
}
