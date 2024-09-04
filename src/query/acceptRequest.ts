import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  requestId: number;
  donorId: number;
};

export default function useAcceptRequestMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["accept-request"],
    mutationFn: async ({ donorId, requestId }: Props) => {
      await fetch(
        `https://life-donors.onrender.com/users/accept/request/${requestId}/?donor_id=${donorId}`,
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
