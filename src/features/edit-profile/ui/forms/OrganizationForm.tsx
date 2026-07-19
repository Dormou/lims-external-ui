import { useForm } from '@mantine/form'
import { TextInput, Grid } from '@mantine/core'
import {
  useUpdateOrganizationMutation,
  type UserProfile,
} from '@/entities/user'
import { ProfileSection } from '../components/ProfileSection'

export const OrganizationForm = ({
  profile,
}: {
  profile: UserProfile | undefined
}) => {
  const [updateOrganization] = useUpdateOrganizationMutation()

  const organizationForm = useForm({
    initialValues: {
      organizationFullName: profile?.organizationFullName || '',
      organizationShortName: profile?.organizationShortName || '',
      organizationLegalAddress: profile?.organizationLegalAddress || '',
      organizationPostalAddress: profile?.organizationPostalAddress || '',
      innKpp: profile?.innKpp || '',
      ogrn: profile?.ogrn || '',
      organizationEmail: profile?.organizationEmail || '',
      organizationPhoneNumber: profile?.organizationPhoneNumber || '',
    },
  })

  const handleSaveOrganization = async () => {
    try {
      await updateOrganization(organizationForm.values).unwrap()
      organizationForm.resetDirty()
    } catch (e) {
      console.error('Ошибка обновления организации', e)
    }
  }

  return (
    <ProfileSection
      title="Информация об организации"
      description="Данные, необходимые для формирования документов"
      isDirty={organizationForm.isDirty()}
      onSave={handleSaveOrganization}
      onReset={() => organizationForm.reset()}
    >
      <TextInput
        label="Полное наименование"
        placeholder="Введите полное наименование"
        required
        {...organizationForm.getInputProps('organizationFullName')}
      />
      <TextInput
        label="Сокращённое наименование"
        placeholder="Введите сокращенное наименование"
        {...organizationForm.getInputProps('organizationShortName')}
        mt="md"
      />
      <TextInput
        label="Юридический адрес"
        placeholder="Введите юридический адрес"
        {...organizationForm.getInputProps('organizationLegalAddress')}
        mt="md"
      />
      <TextInput
        label="Почтовый адрес"
        placeholder="Введите почтовый адрес"
        {...organizationForm.getInputProps('organizationPostalAddress')}
        mt="md"
      />

      <Grid gap="xl">
        <Grid.Col span={6}>
          <TextInput
            label="ИНН/КПП"
            placeholder="Введите ИНН/КПП"
            required
            {...organizationForm.getInputProps('innKpp')}
          />
          <TextInput
            label="Email"
            placeholder="Введите email"
            {...organizationForm.getInputProps('organizationEmail')}
            mt="md"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="ОГРН"
            placeholder="Введите ОГРН"
            {...organizationForm.getInputProps('ogrn')}
          />
          <TextInput
            label="Телефон"
            placeholder="Введите телефон"
            {...organizationForm.getInputProps('organizationPhoneNumber')}
            mt="md"
          />
        </Grid.Col>
      </Grid>
    </ProfileSection>
  )
}
