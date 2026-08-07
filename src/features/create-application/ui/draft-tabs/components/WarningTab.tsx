import { Icon } from '@iconify/react'
import { Stack, Text } from '@mantine/core'

export const WarningTab = ({ text }: { text: string }) => {
  return (
    <Stack h="stretch" justify="center" align="center">
      <Icon
        icon="mdi:warning-circle-outline"
        width={48}
        height={48}
        opacity={0.3}
      />
      <Text c="dimmed" size="xl">
        {text}
      </Text>
    </Stack>
  )
}
