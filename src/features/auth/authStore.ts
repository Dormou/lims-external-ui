import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: string;
  fullName: {
    firstName: string;
    lastName: string;
    patronymic: string | null;
  };
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  setAuth: (data: any) => void;
  logout: () => void;
  getDisplayName: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      setAuth: (data) =>
        set({
          token: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.userInfo,
        }),
      logout: () => set({ token: null, refreshToken: null, user: null }),
      getDisplayName: () => {
        const user = get().user;
        if (!user) return "Гость";

        const { firstName, lastName, patronymic } = user.fullName;
        const initials =
          `${firstName[0]}.` + (patronymic ? `${patronymic[0]}.` : "");

        return `${lastName} ${initials}`;
      },
    }),
    { name: "auth-storage" },
  ),
);
