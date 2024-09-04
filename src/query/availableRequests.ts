import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const DonationRequestSchema = z.object({
  donor: z.string(),
  id: z.number(),
  blood_group: z.string(),
  blood_request_type: z.enum(["Pending", "Running", "Completed"]),
  district: z.string(),
  date_of_donation: z.string(),
  gender: z.enum(["Male", "Female"]),
  accepted_donor_id: z.string().optional(),
  details: z.string(),
});

export type RequestType = z.infer<typeof DonationRequestSchema>;
export const DonationRequestsSchema = z.array(DonationRequestSchema);

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
      return DonationRequestsSchema.parse(data);
    },
    refetchInterval: 3500,
    enabled: !!userId,
  });
}
