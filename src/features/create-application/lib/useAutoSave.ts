import { useEffect, useRef } from 'react'
import { notifications } from '@mantine/notifications'
import { useSaveDraftMutation } from '../api/createApplicationApi'
import type { UseFormReturn } from 'react-hook-form'
import type { DraftForm } from '../model/draftSchema'

export function useAutoSave({
  form,
  id,
}: {
  form: UseFormReturn<DraftForm>
  id: string | null
}) {
  const [saveDraft] = useSaveDraftMutation()

  // Храним последнее отправленное значение, чтобы не слать одинаковые данные
  const lastSavedValueRef = useRef<string | null>(null)

  // Флаг для пропуска автосохранения
  const skipSaveRef = useRef(false)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!id || skipSaveRef.current) {
        console.log('skipped')
        return
      }

      const currentValue = form.getValues()
      const JSONValue = JSON.stringify(currentValue)

      // Проверяем, изменились ли данные с последнего сохранения
      if (JSONValue === lastSavedValueRef.current) {
        console.log('identity')
        return // Данные те же — не сохраняем
      }

      try {
        console.log('saved')
        await saveDraft({ id, draft: currentValue }).unwrap()

        // Обновляем последнее сохранённое значение
        lastSavedValueRef.current = JSONValue
      } catch (e) {
        notifications.show({
          title: 'Ошибка автосохранения',
          message: 'Не удалось сохранить черновик. Проверьте соединение.',
          color: 'errorRed',
          autoClose: 5000,
        })
        console.error('AutoSave error:', e)
      }
    }, 5000) // Интервал 10 секунд

    // Очистка при размонтировании или изменении зависимостей
    return () => clearInterval(intervalId)
  }, [form, id, saveDraft])

  const skipSaving = () => {
    skipSaveRef.current = true
  }

  const restoreSaving = () => {
    skipSaveRef.current = false
  }

  return { skipSaving, restoreSaving }
}
