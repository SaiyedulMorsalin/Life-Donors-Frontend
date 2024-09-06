import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  data: {
    req_donor_id: number;
    user_id: number;
    blood_group: string;
    blood_request_type: "Running" | "Pending" | "Completed";
    district: string;
    date_of_donation: string;
    gender: string;
    details: string;
  };
};

export function useRequestDonorMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ data }: Props) => {
      const res = await fetch(
        `https://life-donors.onrender.com/users/create/request/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) throw new Error();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return { ...mutation };
}
