import { useForm } from '@mantine/form'
import { Grid, TextInput } from '@mantine/core'
import { useUpdateHeadMutation, type UserProfile } from '@/entities/user'
import { ProfileSection } from '../components/ProfileSection'
import { useUserFormContext } from '../../model/userFormContext'

export const HeadForm = ({ profile }: { profile: UserProfile | undefined }) => {
  const userForm = useUserFormContext()
  const [updateHead] = useUpdateHeadMutation()

  const headForm = useForm({
    initialValues: {
      firstName: profile?.headFirstName || '',
      lastName: profile?.headLastName || '',
      patronymic: profile?.headPatronymic || '',
      headPosition: profile?.headPosition || '',
      headDocument: profile?.headDocument || '',
    },
  })

  const handleSaveHead = async () => {
    try {
      await updateHead(headForm.values).unwrap()
      headForm.resetDirty()
    } catch (e) {
      console.error('Ошибка обновления руководителя', e)
    }
  }

  const iAmHead = userForm.values.iAmHead

  return (
    <ProfileSection
      title="Информация о руководителе организации"
      description="Данные руководителя организации или иного лица, удостоверенного на подписание документов от имени организации"
      isDirty={headForm.isDirty()}
      onSave={handleSaveHead}
      onReset={() => headForm.reset()}
    >
      <Grid gap="xl">
        <Grid.Col span={6}>
          <TextInput
            label="Фамилия"
            placeholder="Введите фамилию"
            disabled={iAmHead}
            value={
              iAmHead ? userForm.values.lastName : headForm.values.lastName
            }
            onChange={(e) => headForm.setFieldValue('lastName', e.target.value)}
          />
          <TextInput
            label="Имя"
            placeholder="Введите имя"
            disabled={iAmHead}
            value={
              iAmHead ? userForm.values.firstName : headForm.values.firstName
            }
            onChange={(e) =>
              headForm.setFieldValue('firstName', e.target.value)
            }
          />
          <TextInput
            label="Отчество (при наличии)"
            placeholder="Введите отчество"
            disabled={iAmHead}
            value={
              iAmHead ? userForm.values.patronymic : headForm.values.patronymic
            }
            onChange={(e) => headForm.setFieldValue('lastName', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Должность"
            placeholder="Введите должность"
            {...headForm.getInputProps('headPosition')}
          />
          <TextInput
            label="Основание"
            placeholder="Введите наименование и реквизиты документа"
            {...headForm.getInputProps('headDocument')}
          />
        </Grid.Col>
      </Grid>
    </ProfileSection>
  )
}
