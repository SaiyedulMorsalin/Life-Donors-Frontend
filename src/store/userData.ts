import { create } from "zustand";

interface UserData {
  token: string | null;
  userId: string | null;
}

interface UserState {
  userData: UserData | null;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
}

const getInitialUserData = (): UserData | null => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("userToken");
    const userId = sessionStorage.getItem("userId");
    return token && userId ? { token, userId } : null;
  }
  return null;
};

export const useUserStore = create<UserState>((set) => ({
  userData: null,

  setUser: (userData: UserData) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userToken", userData.token ?? "");
      sessionStorage.setItem("userId", userData.userId ?? "");
    }
    set({ userData });
  },

  clearUser: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("userId");
    }
    set({ userData: null });
  },
}));

// Client-side initialization
if (typeof window !== "undefined") {
  useUserStore.setState({ userData: getInitialUserData() });
}
