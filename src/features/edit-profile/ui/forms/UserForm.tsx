import { useDispatch } from 'react-redux'
import { Grid, TextInput, Stack, Checkbox } from '@mantine/core'
import { setFullName } from '@/entities/auth'
import { useUpdateUserMutation } from '@/entities/user'
import { ProfileSection } from '../components/ProfileSection'
import { useUserFormContext } from '../../model/userFormContext'

export const UserForm = () => {
  const dispatch = useDispatch()
  const userForm = useUserFormContext()
  const [updateUser] = useUpdateUserMutation()

  const handleSaveUser = async () => {
    try {
      await updateUser(userForm.values).unwrap()

      dispatch(
        setFullName({
          firstName: userForm.values.firstName,
          lastName: userForm.values.lastName,
          patronymic: userForm.values.patronymic,
        })
      )

      userForm.resetDirty()
    } catch (e) {
      console.error('Ошибка обновления пользователя', e)
    }
  }

  return (
    <ProfileSection
      title="Информация о пользователе"
      description="Данные, необходимые для получения доступа к системе"
      isDirty={userForm.isDirty()}
      onSave={handleSaveUser}
      onReset={() => userForm.reset()}
    >
      <Grid gap="xl">
        <Grid.Col span={6}>
          <TextInput
            label="Фамилия"
            placeholder="Введите фамилию"
            required
            {...userForm.getInputProps('lastName')}
          />
          <TextInput
            label="Имя"
            placeholder="Введите имя"
            required
            {...userForm.getInputProps('firstName')}
            mt="md"
          />
          <TextInput
            label="Отчество (при наличии)"
            placeholder="Введите отчество"
            {...userForm.getInputProps('patronymic')}
            mt="md"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            placeholder="Введите email"
            required
            {...userForm.getInputProps('email')}
          />
          <TextInput
            label="Телефон"
            placeholder="Введите телефон"
            {...userForm.getInputProps('phoneNumber')}
            mt="md"
          />
          <Stack gap={8} mt="md">
            <Checkbox
              label="Я являюсь контактным лицом по техническим вопросам"
              {...userForm.getInputProps('iAmTechContact', {
                type: 'checkbox',
              })}
            />
            <Checkbox
              label="Я являюсь руководителем организации (или иным лицом, уполномоченным на подписание документов)"
              {...userForm.getInputProps('iAmHead', {
                type: 'checkbox',
              })}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </ProfileSection>
  )
}
