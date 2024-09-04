import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const BloodDonorSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
});

const BloodDonorArraySchema = z.array(BloodDonorSchema);
export type BloodDonor = z.infer<typeof BloodDonorSchema>;

export function useSearchDonorQuery() {
  const query = useQuery({
    queryKey: ["search-donor"],
    queryFn: async () => {
      const res = await fetch("https://life-donors.onrender.com/users/donors/");

      if (res.ok) {
        const data: unknown = await res.json();
        const parsedData = BloodDonorArraySchema.parse(data);

        return parsedData;
      }
    },
    refetchInterval: 3500,
  });

  return { ...query };
}
