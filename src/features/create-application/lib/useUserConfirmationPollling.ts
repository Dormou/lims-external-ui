import { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetClientConfirmedQuery } from '../api/createApplicationApi'

export const useUserConfirmationPolling = (intervalMs: number = 10000) => {
  const [isUserConfirmed, setUserConfirmed] = useState<boolean | undefined>(
    undefined
  )

  const { data } = useGetClientConfirmedQuery(
    isUserConfirmed ? skipToken : undefined,
    { pollingInterval: intervalMs }
  )

  useEffect(() => {
    if (data && data.confirmed) setUserConfirmed(true)
  }, [data])

  return { isUserConfirmed: data?.confirmed, confirmComment: data?.comment }
}
