import { createFormContext } from '@mantine/form'

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<{
    firstName: string
    lastName: string
    patronymic: string
    email: string
    phoneNumber: string
    iAmTechContact: boolean
    iAmHead: boolean
  }>()
