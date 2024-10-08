import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  requestId: number;
  donorId: number;
};

export function useAcceptRequestMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["accept-request"],
    mutationFn: async ({ donorId, requestId }: Props) => {
      await fetch(
        `https://lifedonors.pythonanywhere.com/users/accept/request/${requestId}/?donor_id=${donorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["available-requests"] });
    },
  });

  return { ...mutation };
}

export function useCancelDonationMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ donorId, requestId }: Props) => {
      await fetch(
        `https://life-donors.onrender.com/users/cancel/donate/${requestId}/?donor_id=${donorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["available-requests"] });
    },
  });

  return { ...mutation };
}
