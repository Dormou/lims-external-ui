import { useEffect } from "react";
import {
  Loader,
  ScrollArea,
} from "@mantine/core";
import { useProfileStore } from "../features/profile/profileStore";
import { ProfileForm } from "../features/profile/components/ProfileForm";

export const ProfilePage = () => {
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProfile]);

  if (!profile) return <Loader />;

  return (
      <ProfileForm profile={profile} />
  );
};
