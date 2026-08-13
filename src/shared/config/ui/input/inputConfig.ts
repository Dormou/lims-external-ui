import {
  TextInput,
  PasswordInput,
  NumberInput,
  Select,
  MultiSelect,
  Pill,
} from '@mantine/core'
import inputClasses from './input.module.css'

/**
 * Общие классы для TextInput, NumberInput и PasswordInput
 */
const baseInputClasses = {
  root: inputClasses.root,
  wrapper: inputClasses.wrapper,
  input: inputClasses.input,
  label: inputClasses.label,
  error: inputClasses.error,
}

/**
 * Классы для Select и MultiSelect
 */
const selectClasses = {
  ...baseInputClasses,
  dropdown: inputClasses.dropdown,
  option: inputClasses.option,
}

/**
 * Конфигурация текстового поля TextInput
 *
 * @description
 * Базовое текстовое поле ввода.
 *
 * @states
 * - default — серый бордер
 * - hover — синий бордер
 * - focus — синий бордер
 * - disabled — серый фон, нельзя редактировать
 * - error — красный бордер, сообщение об ошибке
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Имя"
 *   placeholder="Введите имя"
 * />
 * ```
 */
export const textInputConfig = TextInput.extend({
  classNames: baseInputClasses,
})

/**
 * Конфигурация числового поля NumberInput
 *
 * @description
 * Базовое числовое поле ввода.
 *
 * @states
 * - default — серый бордер
 * - hover — синий бордер
 * - focus — синий бордер
 * - disabled — серый фон, нельзя редактировать
 * - error — красный бордер, сообщение об ошибке
 *
 * @example
 * ```tsx
 * <NumberInput
 *   label="Количество"
 *   placeholder="Введите количество"
 * />
 * ```
 */
export const numberInputConfig = NumberInput.extend({
  classNames: baseInputClasses,
})

/**
 * Конфигурация поля с паролем PasswordInput
 *
 * @description
 * Наследует все стили TextInput.
 * Имеет кнопку переключения видимости пароля (глаз).
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Пароль"
 *   placeholder="Введите пароль"
 * />
 * ```
 */
export const passwordInputConfig = PasswordInput.extend({
  classNames: {
    ...baseInputClasses,
    visibilityToggle: inputClasses.visibilityToggle,
  },
})

/**
 * Конфигурация выпадающего списка Select
 *
 * @description
 * Выбор одного значения из выпадающего списка.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Город"
 *   placeholder="Выберите город"
 *   data={['Москва', 'СПб', 'Казань']}
 * />
 * ```
 */
export const selectConfig = Select.extend({
  classNames: selectClasses,
})

/**
 * Конфигурация множественного выбора MultiSelect
 *
 * @description
 * Выбор нескольких значений с отображением в виде табов (Pill).
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Навыки"
 *   placeholder="Выберите навыки"
 *   data={['React', 'TypeScript', 'CSS']}
 * />
 * ```
 */
export const multiSelectConfig = MultiSelect.extend({
  classNames: selectClasses,
})

/**
 * Конфигурация Pill (таб выбранного значения)
 *
 * @description
 * Отображает выбранное значение в MultiSelect.
 *
 * @colors
 * - default — светло-синий фон, синий текст
 * - disabled — серый фон, серый текст
 */
export const pillConfig = Pill.extend({
  classNames: {
    root: inputClasses.pill,
  },
})
