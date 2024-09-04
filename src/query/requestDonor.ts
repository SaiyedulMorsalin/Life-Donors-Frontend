import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  data: {
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
      await fetch(`https://life-donors.onrender.com/users/create/request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          user_id: data.user_id,
        }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return { ...mutation };
}
