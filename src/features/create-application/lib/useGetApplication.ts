import { useMemo } from 'react'
import { useGetApplicationQuery } from '@/entities/application'
import { useSearchParams } from 'react-router-dom'
import type { DraftForm } from '../model/draftSchema'

export const useGetApplication = () => {
  const [searchParams] = useSearchParams()

  const { data: applicationData, isLoading: isApplicationLoading } =
    useGetApplicationQuery(searchParams.get('id') ?? '', {
      skip: !searchParams.get('id'),
    })

  const draftData: DraftForm | undefined = useMemo(() => {
    const draft = applicationData?.draft
    if (draft) {
      return {
        branchId: draft.branchId ?? '',
        equipmentTypeId: draft.equipmentTypeId ?? '',
        producerName: draft.producerName ?? '',
        producerAddress: draft.producerAddress ?? '',
        samples: draft.samples.map((sample) => ({
          id: sample.id,
          name: sample.name ?? '',
          parameterValues: sample.parameterValues,
          testValues: sample.testValues,
        })),
      }
    } else return undefined
  }, [applicationData])

  return {
    applicationId: searchParams.get('id'),
    applicationData,
    isApplicationLoading,
    draftData: draftData,
  }
}
