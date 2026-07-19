import { Loader } from '@mantine/core'
import { useGetProfileQuery } from '@/entities/user'
import { EditProfileForm } from '@/features/edit-profile'
import { SecurityForm } from '@/features/change-password'

export const ProfilePage = () => {
  const { data, isFetching, isError } = useGetProfileQuery()

  if (isFetching) return <Loader />
  if (isError) return <div>Не удалось загрузить данные</div>

  return <EditProfileForm securityForm={<SecurityForm />} profileData={data} />
}
