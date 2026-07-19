import { ActionIcon, TextInput } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'

interface SearchInputProps {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  onClear: () => void
}

export const SearchInput = ({
  value = '',
  placeholder = 'Поиск',
  onChange,
  onClear,
}: SearchInputProps) => {
  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <TextInput
      placeholder={placeholder}
      leftSection={<IconSearch size={16} />}
      w={600}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      rightSection={
        value ? (
          <ActionIcon variant="subtle" color="dimmed" onClick={handleClear}>
            <IconX size={16} />
          </ActionIcon>
        ) : null
      }
    />
  )
}
