import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsUserConfirmed } from '../model/createApplicationSlice'
import { useLazyGetClientConfirmedQuery } from '../api/createApplicationApi'

export const useUserConfirmationPolling = (intervalMs: number = 10000) => {
  const dispatch = useDispatch()
  const [getClientConfirmed] = useLazyGetClientConfirmedQuery()

  const isUserConfirmed = useSelector(
    (state) => state.createApplication.isUserConfirmed
  )

  useEffect(() => {
    if (isUserConfirmed) return

    const checkStatus = async () => {
      try {
        const confirmData = await getClientConfirmed().unwrap()
        dispatch(setIsUserConfirmed(confirmData.confirmed))
      } catch (e) {
        console.error('Ошибка проверки подтверждения пользователя:', e)
      }
    }

    checkStatus()

    const intervalId = setInterval(checkStatus, intervalMs)

    return () => clearInterval(intervalId)
  }, [isUserConfirmed, intervalMs])
}
