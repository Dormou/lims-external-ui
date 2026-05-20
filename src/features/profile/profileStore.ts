import { create } from "zustand";
import { profileApi } from "./profileApi";
import { useAuthStore } from "../auth/authStore";

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
}

export interface UserProfile {
  fullName: { firstName: string; lastName: string; patronymic: string | null };
  registrationDate: string;
  passwordChangeDate: string;
  email: string;
  phoneNumber: string | null;
  iAmTechContact: boolean;
  iAmHead: boolean;
  organizationFullName: string;
  organizationShortName: string | null;
  organizationLegalAddress: string | null;
  organizationPostalAddress: string | null;
  innKpp: string;
  ogrn: string | null;
  organizationEmail: string | null;
  organizationPhoneNumber: string | null;
  headFullName: {
    firstName: string;
    lastName: string;
    patronymic: string | null;
  } | null;
  headPosition: string | null;
  headDocument: string | null;
  techContactFullName: {
    firstName: string;
    lastName: string;
    patronymic: string | null;
  } | null;
  techContactEmail: string | null;
  techContactPhoneNumber: string | null;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await profileApi.getProfile();
      set({ profile: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
      }
    }
  },
}));
