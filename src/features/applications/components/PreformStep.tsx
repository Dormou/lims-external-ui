import { Stack, Text, Button } from '@mantine/core'
import { applicationsSlice } from '../applicationStore'
import { useAppDispatch } from '../../../store'
import { useCreateDraftMutation } from '../../../api/applications/applicationsApi'

export const PreformStep = () => {
  const dispatch = useAppDispatch()

  const [createDraft] = useCreateDraftMutation()

  const handleStart = async () => {
    try {
      const response = await createDraft().unwrap()

      dispatch(applicationsSlice.actions.setApplicationId(response.id))
      dispatch(applicationsSlice.actions.setStep(1))
    } catch (error) {
      console.error('Не удалось создать черновик:', error)
      // Здесь можно добавить уведомление пользователю
    }
  }

  return (
    <Stack gap={24} align="center">
      <Text
        py={24}
        ta="center"
        c="#212529"
        style={{
          fontFamily: 'PF Din Text Cond Pro',
          fontWeight: 300,
          fontSize: '20px',
        }}
      >
        В форме подачи заявки вам необходимо заполнить четыре раздела: Общая
        информация, Характеристики объектов испытаний, Требования к испытаниям и
        Техническая документация.
        <br />
        <br />
        После этого система сформирует заявку и предложит вам скачать
        сформированный документ. Вам необходимо распечатать его на фирменном
        бланке вашей организации, поставить подпись руководителя организации
        (или иного лица, уполномоченного на подпись документов) и загрузить скан
        подписанного документа в систему.
        <br />
        <br />
        Обратите внимание: для формирования заявки у вас должны быть заполнены
        все данные в Личном кабинете.
        <br />
        <br />
        Вы можете в любой момент прервать заполнение заявки и вернуться к ней
        позже. Заявка будет храниться в системе в статусе 'Черновик' в течение
        30 дней.
      </Text>

      <Button variant="filled" onClick={handleStart}>
        Заполнить заявку
      </Button>
    </Stack>
  )
}
