import { useUserStore } from "@/store/userData";
import { useMutation } from "@tanstack/react-query";

type LoginResponse = {
  token: string;
  user_id: string;
};

type Props = {
  username: string;
  password: string;
};

export function useLoginMutation() {
  const setUserData = useUserStore((store) => store.setUser);
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      password,
      username,
    }: Props): Promise<LoginResponse> => {
      const response = await fetch(
        "https://life-donors.onrender.com/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json() as Promise<LoginResponse>;
    },
    onSuccess: (data) => {
      setUserData({
        token: data.token,
        userId: data.user_id,
      });
    },
  });

  return { ...mutation };
}
