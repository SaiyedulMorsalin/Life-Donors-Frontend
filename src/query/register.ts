import { useMutation } from "@tanstack/react-query";

type Props = {
  data: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    group: string;
    password: string;
    confirmPassword: string;
  };
};

export function useRegisterMutation() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ data }: Props) => {
      const response = await fetch(
        "https://life-donors.onrender.com/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.userName,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            mobile_number: data.phone,
            blood_group: data.group,
            password: data.password,
            confirm_password: data.confirmPassword,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }
    },
  });

  return { ...mutation };
}
