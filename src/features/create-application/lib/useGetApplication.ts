import { useGetApplicationQuery } from '@/entities/application'
import { useSearchParams } from 'react-router-dom'

export const useGetApplication = () => {
  const [searchParams] = useSearchParams()

  const { data: applicationData, isLoading: isApplicationLoading } =
    useGetApplicationQuery(searchParams.get('id') ?? '', {
      skip: !searchParams.get('id'),
    })

  return {
    applicationData,
    isApplicationLoading,
  }
}
