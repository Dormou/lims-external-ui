import { Icon } from "@iconify/react"
import {
  Loader,
  Stack,
  Group,
  Avatar,
  Title,
  Grid,
  TextInput,
  Checkbox,
  Text,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { formatDate } from "../../../utils"
import { ProfileSection } from "./ProfileSection"
import {
  useUpdateHeadMutation, 
  useUpdateOrganizationMutation, 
  useUpdateTechContactMutation, 
  useUpdateUserMutation 
} from "../profileApi"
import { SecuritySection } from "./SecuritySection"

import type { UserProfile } from '../types/userProfile'

export const ProfileForm = ({ profile }: { profile: UserProfile }) => {
  const [updateUser] = useUpdateUserMutation()
  const [updateOrganization] = useUpdateOrganizationMutation()
  const [updateHead] = useUpdateHeadMutation()
  const [updateTechContact] = useUpdateTechContactMutation()

  const userForm = useForm({
    initialValues: {
      firstName: profile?.fullName.firstName || "",
      lastName: profile?.fullName.lastName || "",
      patronymic: profile?.fullName.patronymic || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      iAmTechContact: profile?.iAmTechContact || false,
      iAmHead: profile?.iAmHead || false,
    },
  });

  const handleSaveUser = async () => {
    try {
      await updateUser(userForm.values).unwrap()
      userForm.resetDirty()
    } catch (e) {
      console.error("Ошибка обновления пользователя", e)
    }
  }

  const organizationForm = useForm({
    initialValues: {
      organizationFullName: profile?.organizationFullName || "",
      organizationShortName: profile?.organizationShortName || "",
      organizationLegalAddress: profile?.organizationLegalAddress || "",
      organizationPostalAddress: profile?.organizationPostalAddress || "",
      innKpp: profile?.innKpp || "",
      ogrn: profile?.ogrn || "",
      organizationEmail: profile?.organizationEmail || "",
      organizationPhoneNumber: profile?.organizationPhoneNumber || "",
    },
  });

  const handleSaveOrganization = async () => {
    try {
      await updateOrganization(organizationForm.values).unwrap()
      organizationForm.resetDirty()
    } catch (e) {
      console.error("Ошибка обновления организации", e)
    }
  }

  const headForm = useForm({
    initialValues: {
      firstName: profile?.headFirstName || "",
      lastName: profile?.headLastName || "",
      patronymic: profile?.headPatronymic || "",
      headPosition: profile?.headPosition || "",
      headDocument: profile?.headDocument || "",
    },
  })

  const handleSaveHead = async () => {
    try {
      await updateHead(headForm.values).unwrap()
      headForm.resetDirty()
    } catch (e) {
      console.error("Ошибка обновления руководителя", e)
    }
  }

  const techContactForm = useForm({
    initialValues: {
      firstName: profile?.techContactFirstName || "",
      lastName: profile?.techContactLastName || "",
      patronymic: profile?.techContactPatronymic || "",
      email: profile?.techContactEmail || "",
      phoneNumber: profile?.techContactPhoneNumber || "",
    },
  })

  const handleSaveTechContact = async () => {
    try {
      await updateTechContact(techContactForm.values).unwrap()
      techContactForm.resetDirty()
    } catch (e) {
      console.error("Ошибка обновления контакта по техническим вопросам", e)
    }
  }

  const iAmTechContact = userForm.values.iAmTechContact;
  const iAmHead = userForm.values.iAmHead;

  if (!profile) return <Loader />;
  else
    return (
      <Stack gap={40} w="100%">
        <Group gap={24}>
          <Avatar size={80} radius="xl" color="#005B9C">
            <Icon icon="mdi:user" width={40} />
          </Avatar>
          <Stack gap={4}>
            <Title order={1} style={{ fontFamily: "DIN Pro" }}>
              {`${userForm.values.lastName} ${userForm.values.firstName} ${userForm.values.patronymic || ""}`}
            </Title>
            <Text c="dimmed" size="sm">
              Дата регистрации:
              {profile?.registrationDate
                ? formatDate(profile.registrationDate)
                : ""}
            </Text>
          </Stack>
        </Group>

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
                {...userForm.getInputProps("lastName")}
              />
              <TextInput
                label="Имя"
                placeholder="Введите имя"
                required
                {...userForm.getInputProps("firstName")}
                mt="md"
              />
              <TextInput
                label="Отчество (при наличии)"
                placeholder="Введите отчество"
                {...userForm.getInputProps("patronymic")}
                mt="md"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="Введите email"
                required
                {...userForm.getInputProps("email")}
              />
              <TextInput
                label="Телефон"
                placeholder="Введите телефон"
                {...userForm.getInputProps("phoneNumber")}
                mt="md"
              />
              <Stack gap={8} mt="md">
                <Checkbox
                  label="Я являюсь контактным лицом по техническим вопросам"
                  {...userForm.getInputProps("iAmTechContact", {
                    type: "checkbox",
                  })}
                />
                <Checkbox
                  label="Я являюсь руководителем организации (или иным лицом, уполномоченным на подписание документов)"
                  {...userForm.getInputProps("iAmHead", {
                    type: "checkbox",
                  })}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </ProfileSection>

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
            {...organizationForm.getInputProps("organizationFullName")}
          />
          <TextInput
            label="Сокращённое наименование"
            placeholder="Введите сокращенное наименование"
            {...organizationForm.getInputProps("organizationShortName")}
            mt="md"
          />
          <TextInput
            label="Юридический адрес"
            placeholder="Введите юридический адрес"
            {...organizationForm.getInputProps("organizationLegalAddress")}
            mt="md"
          />
          <TextInput
            label="Почтовый адрес"
            placeholder="Введите почтовый адрес"
            {...organizationForm.getInputProps("organizationPostalAddress")}
            mt="md"
          />

          <Grid gap="xl">
            <Grid.Col span={6}>
              <TextInput
                label="ИНН/КПП"
                placeholder="Введите ИНН/КПП"
                required
                {...organizationForm.getInputProps("innKpp")}
              />
              <TextInput
                label="Email"
                placeholder="Введите email"
                {...organizationForm.getInputProps("organizationEmail")}
                mt="md"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="ОГРН"
                placeholder="Введите ОГРН"
                {...organizationForm.getInputProps("ogrn")}
              />
              <TextInput
                label="Телефон"
                placeholder="Введите телефон"
                {...organizationForm.getInputProps("organizationPhoneNumber")}
                mt="md"
              />
            </Grid.Col>
          </Grid>
        </ProfileSection>

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
                onChange={(e) =>
                  headForm.setFieldValue("lastName", e.target.value)
                }
              />
              <TextInput
                label="Имя"
                placeholder="Введите имя"
                disabled={iAmHead}
                value={
                  iAmHead
                    ? userForm.values.firstName
                    : headForm.values.firstName
                }
                onChange={(e) =>
                  headForm.setFieldValue("firstName", e.target.value)
                }
              />
              <TextInput
                label="Отчество (при наличии)"
                placeholder="Введите отчество"
                disabled={iAmHead}
                value={
                  iAmHead
                    ? userForm.values.patronymic
                    : headForm.values.patronymic
                }
                onChange={(e) =>
                  headForm.setFieldValue("lastName", e.target.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Должность"
                placeholder="Введите должность"
                {...headForm.getInputProps("headPosition")}
              />
              <TextInput
                label="Основание"
                placeholder="Введите наименование и реквизиты документа"
                {...headForm.getInputProps("headDocument")}
              />
            </Grid.Col>
          </Grid>
        </ProfileSection>

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
                  techContactForm.setFieldValue("lastName", e.target.value)
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
                  techContactForm.setFieldValue("firstName", e.target.value)
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
                  techContactForm.setFieldValue("lastName", e.target.value)
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
                  techContactForm.setFieldValue("email", e.target.value)
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
                  techContactForm.setFieldValue("phoneNumber", e.target.value)
                }
              />
            </Grid.Col>
          </Grid>
        </ProfileSection>

        <SecuritySection lastUpdate={profile?.passwordChangeDate} />
      </Stack>
    );
};
