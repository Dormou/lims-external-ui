import { Stack, Group, Text, Box, Image } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import styles from './OuterLayout.module.css'

export const OuterLayout = () => {
  return (
    <Group gap={0} h="100vh" align="stretch">
      <Box flex={1} pos="relative" bg="white" className={styles.contentBox}>
        <Box className={styles.authBackground} />
        <Stack
          p={40}
          h="100%"
          justify="space-between"
          pos="relative"
          className={styles.backGroundStack}
        >
          <Group gap="xl">
            <Image src="/logo.png" alt="Россети" h={48} w="auto" />
            <Text fw={700} size="xxl" c="primaryBlue">
              АИС Управление испытаниями
            </Text>
          </Group>

          <Text size="md" c="primaryBlue">
            Разработано Департаментом цифровых технологий АО 'Россети
            Научно-технический центр' ®
          </Text>
        </Stack>
      </Box>
      <Outlet />
    </Group>
  )
}
