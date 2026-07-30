import { useForm } from '@mantine/form'
import { Grid, TextInput } from '@mantine/core'
import { useUpdateTechContactMutation, type UserProfile } from '@/entities/user'
import { ProfileSection } from '../components/ProfileSection'
import { useUserFormContext } from '../../model/userFormContext'

export const TechContactForm = ({
  profile,
}: {
  profile: UserProfile | undefined
}) => {
  const userForm = useUserFormContext()
  const [updateTechContact] = useUpdateTechContactMutation()

  const techContactForm = useForm({
    initialValues: {
      firstName: profile?.techContactFirstName || '',
      lastName: profile?.techContactLastName || '',
      patronymic: profile?.techContactPatronymic || '',
      email: profile?.techContactEmail || '',
      phoneNumber: profile?.techContactPhoneNumber || '',
    },
  })

  const handleSaveTechContact = async () => {
    try {
      await updateTechContact(techContactForm.values).unwrap()
      techContactForm.resetDirty()
    } catch (e) {
      console.error('Ошибка обновления контакта по техническим вопросам', e)
    }
  }

  const iAmTechContact = userForm.values.iAmTechContact

  return (
    <ProfileSection
      title="Информация о контактном лице по техническим вопросам"
      description="Данные лица, уполномоченного на предоставление технических сведений"
      isDirty={!iAmTechContact && techContactForm.isDirty()}
      onSave={handleSaveTechContact}
      onReset={() => techContactForm.reset()}
    >
      <Grid gap="xl">
        <Grid.Col span={6}>
          <TextInput
            label="Фамилия"
            placeholder="Введите фамилию"
            disabled={iAmTechContact}
            value={
              iAmTechContact
                ? userForm.values.lastName
                : techContactForm.values.lastName
            }
            onChange={(e) =>
              techContactForm.setFieldValue('lastName', e.target.value)
            }
          />
          <TextInput
            label="Имя"
            placeholder="Введите имя"
            disabled={iAmTechContact}
            value={
              iAmTechContact
                ? userForm.values.firstName
                : techContactForm.values.firstName
            }
            onChange={(e) =>
              techContactForm.setFieldValue('firstName', e.target.value)
            }
          />
          <TextInput
            label="Отчество (при наличии)"
            placeholder="Введите отчество"
            disabled={iAmTechContact}
            value={
              iAmTechContact
                ? userForm.values.patronymic
                : techContactForm.values.patronymic
            }
            onChange={(e) =>
              techContactForm.setFieldValue('lastName', e.target.value)
            }
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            placeholder="Введите email"
            disabled={iAmTechContact}
            value={
              iAmTechContact
                ? userForm.values.email
                : techContactForm.values.email
            }
            onChange={(e) =>
              techContactForm.setFieldValue('email', e.target.value)
            }
          />
          <TextInput
            label="Телефон"
            placeholder="Введите телефон"
            disabled={iAmTechContact}
            value={
              iAmTechContact
                ? userForm.values.phoneNumber
                : techContactForm.values.phoneNumber
            }
            onChange={(e) =>
              techContactForm.setFieldValue('phoneNumber', e.target.value)
            }
          />
        </Grid.Col>
      </Grid>
    </ProfileSection>
  )
}
