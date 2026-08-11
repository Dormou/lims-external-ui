import { useEffect, useRef } from 'react'
import { useSaveDraftMutation } from '../api/createApplicationApi'
import type { UseFormReturn } from 'react-hook-form'
import type { DraftForm } from '../model/draftSchema'

export function useAutoSave(
  applicationId: string,
  form: UseFormReturn<DraftForm>
) {
  const [saveDraft] = useSaveDraftMutation()

  const debouncedSaveRef = useRef<(() => void) | undefined>(undefined)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Храним последнее отправленное значение, чтобы не слать одинаковые данные
  const lastSavedValueRef = useRef<string>(JSON.stringify(form.getValues()))

  // Флаг для пропуска автосохранения
  const skipSaveRef = useRef(false)

  useEffect(() => {
    const debounced = () => {
      // Сбрасываем предыдущий таймер ПЕРЕД постановкой нового
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(async () => {
        // Пропуск
        if (skipSaveRef.current) return

        const currentValue = form.getValues()
        const JSONValue = JSON.stringify(currentValue)

        // Проверяем, изменились ли данные с последнего сохранения
        if (JSONValue === lastSavedValueRef.current) return

        try {
          await saveDraft({ id: applicationId, draft: currentValue }).unwrap()

          // Обновляем последнее сохранённое значение
          lastSavedValueRef.current = JSONValue
        } catch (e) {
          console.error('Ошибка автосохранения:', e)
        }
      }, 2000)
    }

    debouncedSaveRef.current = debounced

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [form, applicationId, saveDraft])

  useEffect(() => {
    form.watch(() => {
      debouncedSaveRef.current?.()
    })

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      debouncedSaveRef.current = undefined
    }
  }, [form])

  const skipSaving = () => {
    skipSaveRef.current = true
  }

  const restoreSaving = () => {
    skipSaveRef.current = false
  }

  return { skipSaving, restoreSaving }
}
