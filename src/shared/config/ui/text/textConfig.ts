import { Text } from '@mantine/core'
import textClasses from './text.module.css'

/**
 * Конфигурация текста Text
 *
 * @variants
 * - default — обычный текст, font-weight: 300
 * - emphasis — акцентный текст, font-weight: 400
 *
 * @example
 * ```tsx
 * <Text>Обычный текст</Text>
 * <Text variant="emphasis">Важный текст</Text>
 * ```
 */
export const textConfig = Text.extend({
  classNames: textClasses,
})
