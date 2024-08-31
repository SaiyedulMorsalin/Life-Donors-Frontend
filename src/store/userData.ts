import { create } from "zustand";

type UserData = {
  token: string | null;
  userId: string | null;
};

type UserState = {
  userData: UserData | null;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
};

const getInitialUserData = (): UserData | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    return token && userId ? { token, userId } : null;
  }
  return null;
};

export const useUserStore = create<UserState>((set) => ({
  userData: null,

  setUser: (userData: UserData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userToken", userData.token ?? "");
      localStorage.setItem("userId", userData.userId ?? "");
    }
    set({ userData });
  },

  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
    }
    set({ userData: null });
  },
}));

// Client-side initialization
if (typeof window !== "undefined") {
  useUserStore.setState({ userData: getInitialUserData() });
}
