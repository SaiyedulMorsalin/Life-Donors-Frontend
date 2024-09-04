import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  donorId: string;
  requestId: number;
};

export default function useApproveRequestMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ donorId, requestId }: Props) => {
      await fetch(
        `https://life-donors.onrender.com/users/approve/request/${requestId}/?donor_id=${donorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["dashboard"] });
    },
  });

  return { ...mutation };
}
