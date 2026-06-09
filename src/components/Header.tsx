import { Text, Menu, UnstyledButton, Box, Anchor, Image } from "@mantine/core"
import { Icon } from "@iconify/react"
import { useLogoutMutation } from '../api/auth/authApi'
import { useNavigate } from "react-router-dom"
import { useGetProfileQuery } from '../api/clients/clientsApi'
import { useMemo } from 'react'
import classes from "./Header.module.css"

export const Header = () => {
  const { data } = useGetProfileQuery()

  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  const displayName = useMemo(() => {
    if (!data) return "Гость"

    const { firstName, lastName, patronymic } = data.fullName
    const initials =
    `${firstName[0]}.` + (patronymic ? `${patronymic[0]}.` : "")

    return `${lastName} ${initials}`
  }, [data])

  return (
    <header className={classes.header}>
      <UnstyledButton onClick={() => navigate("/")}>
        <Image src="./logo.png" alt="Россети" style={{
          height: "48px",
          width: "auto",
          filter: "brightness(0) invert(1)",
        }} />
      </UnstyledButton>

      <Anchor
        underline="never"
        className={classes.title}
        style={{ userSelect: "none" }}
        c="var(--white-color)"
        onClick={() => navigate("/")}
      >
        АИС Управление испытаниями
      </Anchor>

      <Menu shadow="none" position="bottom-end" offset={10}>
        <Menu.Target>
          <UnstyledButton className={classes.userFrame}>
            <Icon icon="mdi:user" width="32" height="32" color="white" />
            <Text className={classes.userName}>{displayName}</Text>
            <Icon
              icon="mdi:chevron-down"
              width="20"
              height="20"
              color="white"
            />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className={classes.menuDropdown}>
          <Menu.Item
            className={classes.menuItem}
            onClick={() => navigate("/profile")}
          >
            <div className={classes.menuItemInner}>
              <Icon icon="mdi:user" width="24" height="24" />
              <Text className={classes.accountText}>Личный кабинет</Text>
            </div>
          </Menu.Item>

          <Box className={classes.divider} />

          <Menu.Item className={classes.menuItem} onClick={() => logout()}>
            <div className={classes.menuItemInner}>
              <Icon icon="mdi:logout" width="24" height="24" />
              <Text className={classes.accountText}>Выход</Text>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  );
};
