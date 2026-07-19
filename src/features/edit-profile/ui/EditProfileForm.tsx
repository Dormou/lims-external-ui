import { Stack } from '@mantine/core'
import { ProfileBadge, type UserProfile } from '@/entities/user'
import { UserFormProvider, useUserForm } from '../model/userFormContext'
import { UserForm } from './forms/UserForm'
import { OrganizationForm } from './forms/OrganizationForm'
import { HeadForm } from './forms/HeadForm'
import { TechContactForm } from './forms/TechContactForm'

export const EditProfileForm = ({
  securityForm,
  profileData,
}: {
  securityForm: React.ReactNode
  profileData: UserProfile | undefined
}) => {
  const userForm = useUserForm({
    initialValues: {
      firstName: profileData?.fullName.firstName || '',
      lastName: profileData?.fullName.lastName || '',
      patronymic: profileData?.fullName.patronymic || '',
      email: profileData?.email || '',
      phoneNumber: profileData?.phoneNumber || '',
      iAmTechContact: profileData?.iAmTechContact || false,
      iAmHead: profileData?.iAmHead || false,
    },
  })

  return (
    <Stack gap={40} w="100%">
      <ProfileBadge />
      <UserFormProvider form={userForm}>
        <UserForm />
        <OrganizationForm profile={profileData} />
        <HeadForm profile={profileData} />
        <TechContactForm profile={profileData} />
      </UserFormProvider>
      {securityForm}
    </Stack>
  )
}
