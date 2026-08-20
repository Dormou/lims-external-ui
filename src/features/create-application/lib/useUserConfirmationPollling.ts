import { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetUserConfirmedQuery } from '@/entities/user'

export const useUserConfirmationPolling = (intervalMs: number = 10000) => {
  const [isUserConfirmed, setUserConfirmed] = useState<boolean | undefined>(
    undefined
  )

  const { data } = useGetUserConfirmedQuery(
    isUserConfirmed ? skipToken : undefined,
    { pollingInterval: intervalMs }
  )

  useEffect(() => {
    if (data && data.confirmed) setUserConfirmed(true)
  }, [data])

  return { isUserConfirmed: data?.confirmed, confirmComment: data?.comment }
}
