import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const userProfileSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
  mobile_number: z.string().nullable(),
  email: z.string().nullable(),
});

const apiResponseSchema = z.array(userProfileSchema);

export function useProfileDetailsQuery(id: number | undefined) {
  const query = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await fetch(
        `https://life-donors.onrender.com/users/profile/${id}/`,
      );
      const data: unknown = await response.json();

      const validatedData = apiResponseSchema.parse(data);

      return validatedData;
    },
    enabled: !!id,
    refetchInterval: 5000,
  });

  return { ...query };
}

type Props = {
  district: string;
  gender: string;
  lastDonation: string;
  id: string;
};

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: Props) => {
      await fetch(
        `https://life-donors.onrender.com/users/update/profile/${values.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            district: values.district,
            date_of_donation: values.lastDonation,
            gender: values.gender,
          }),
        },
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["profile"] });
    },
  });

  return { ...mutation };
}
