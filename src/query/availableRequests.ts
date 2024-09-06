import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  is_active: z.boolean(),
});

const DonorSchema = z.object({
  id: z.number(),
  user: UserSchema,
  blood_group: z.string(),
  district: z.string().nullable(),
  date_of_donation: z.string().nullable(),
  gender: z.string().nullable(),
  is_available: z.boolean(),
  mobile_number: z.string(),
  email: z.string(),
});

export const BloodRequestSchema = z.object({
  donor: DonorSchema,
  id: z.number(),
  blood_group: z.string(),
  blood_request_type: z.string(),
  district: z.string().nullable(),
  date_of_donation: z.string().nullable(),
  gender: z.string().nullable(),
  accepted_donor_id: z.string().nullable(),
  details: z.string(),
});

const BloodRequestsArraySchema = z.array(BloodRequestSchema);

export function useAvailableRequestsQuery(userId: string | undefined) {
  return useQuery({
    queryKey: ["available-requests", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const response = await fetch(
        `https://life-donors.onrender.com/users/available_request/?donor_id=${userId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available requests");
      }

      const data: unknown = await response.json();
      return BloodRequestsArraySchema.parse(data);
    },
    refetchInterval: 5000,
    enabled: !!userId,
  });
}
