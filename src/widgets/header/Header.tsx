import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  Text,
  Menu,
  UnstyledButton,
  Box,
  Anchor,
  Image,
  Divider,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { useLogoutMutation } from '@/entities/auth'
import { RoutesPath } from '@/shared/config'
import styles from './Header.module.css'

export const Header = () => {
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.auth.userInfo)
  const [logout] = useLogoutMutation()

  const displayName = useMemo(() => {
    if (!userInfo) return 'Гость'

    const { firstName, lastName, patronymic } = userInfo.fullName
    const initials =
      `${firstName[0]}.` + (patronymic ? `${patronymic[0]}.` : '')

    return `${lastName} ${initials}`
  }, [userInfo])

  return (
    <Box
      component="header"
      px={40}
      py={16}
      display="flex"
      bg="primaryBlue"
      c="white"
      pos="relative"
      className={styles.header}
    >
      <UnstyledButton onClick={() => navigate(RoutesPath.Home)}>
        <Image
          src="./logo.png"
          alt="Россети"
          h={48}
          w="auto"
          className={styles.headerLogo}
        />
      </UnstyledButton>

      <Anchor
        underline="never"
        c="white"
        flex="1 1 auto"
        fw={500}
        ta="left"
        size="xxl"
        className={styles.headerTitle}
        onClick={() => navigate(RoutesPath.Home)}
      >
        АИС Управление испытаниями
      </Anchor>

      <Menu shadow="none" position="bottom-end" offset={10}>
        <Menu.Target>
          <UnstyledButton h={48} display="flex" className={styles.userFrame}>
            <Icon icon="mdi:user" width="32" height="32" color="white" />
            <Text fw={500} size="md">
              {displayName}
            </Text>
            <Icon
              icon="mdi:chevron-down"
              width="20"
              height="20"
              color="white"
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown
          w={296}
          mih={112}
          p={16}
          bg="white"
          display="flex"
          className={styles.menuDropdown}
        >
          <Menu.Item
            h={24}
            p={0}
            bg="transparent"
            onClick={() => navigate(RoutesPath.Profile)}
          >
            <Box
              display="flex"
              w="100%"
              c="primaryBlue"
              className={styles.menuItemInner}
            >
              <Icon icon="mdi:user" width="24" height="24" />
              <Text size="xl" fw={400}>
                Личный кабинет
              </Text>
            </Box>
          </Menu.Item>

          <Divider w="100%" color="primaryBlue" />

          <Menu.Item h={24} p={0} bg="transparent" onClick={() => logout()}>
            <Box
              display="flex"
              w="100%"
              c="primaryBlue"
              className={styles.menuItemInner}
            >
              <Icon icon="mdi:logout" width="24" height="24" />
              <Text size="xl" fw={400}>
                Выход
              </Text>
            </Box>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}
