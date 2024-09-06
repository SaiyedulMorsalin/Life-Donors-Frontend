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
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
  mobile_number: z.string(),
  email: z.string(),
});

export type BloodDonor = z.infer<typeof DonorSchema>;
export const DonorsArraySchema = z.array(DonorSchema);

export function useSearchDonorQuery() {
  const query = useQuery({
    queryKey: ["search-donor"],
    queryFn: async () => {
      const res = await fetch("https://life-donors.onrender.com/users/donors/");

      if (res.ok) {
        const data: unknown = await res.json();
        const parsedData = DonorsArraySchema.parse(data);

        return parsedData;
      }
    },
    refetchInterval: 5000,
  });

  return { ...query };
}
