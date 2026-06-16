import { Loader } from '@mantine/core'
import { ProfileForm } from '../../features/profile/components/ProfileForm'
import { useGetProfileQuery } from '../../api/clients/clientsApi'

export const ProfilePage = () => {
  const { data, isFetching, isSuccess, isError } = useGetProfileQuery()

  if (isFetching) return <Loader />

  if (isSuccess) return <ProfileForm profile={data} />

  if (isError) return <div>Не удалось загрузить данные</div>
}
