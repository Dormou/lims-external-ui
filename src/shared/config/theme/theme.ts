// src/theme.ts (главный файл - остается на своем месте)
import { createTheme } from '@mantine/core'

// Импортируем токены из папки theme/
import { colors } from './colors'
import { typography } from './typography'

// Импортируем конфигурации компонентов
import { buttonConfig, actionIconConfig } from '../ui/button/buttonConfig'
import {
  textInputConfig,
  passwordInputConfig,
  selectConfig,
  multiSelectConfig,
  pillConfig,
} from '../ui/input/inputConfig'
import { textConfig } from '../ui/text/textConfig'
import { tabsConfig } from '../ui/tabs/tabsConfig'

export const theme = createTheme({
  // ============ ЦВЕТА ============
  colors: {
    primaryBlue: colors.primaryBlue,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    complementaryBlue: colors.complementaryBlue,
    complementaryDark: colors.complementaryDark,
    complementaryLight: colors.complementaryLight,
    successGreen: colors.successGreen,
    warningYellow: colors.warningYellow,
    errorRed: colors.errorRed,
    white: colors.white,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    black: colors.black,
  },

  primaryColor: 'primaryBlue',
  black: '#212529',

  // ============ ОТСТУПЫ ============
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // ============ СКРУГЛЕНИЯ ============
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  defaultRadius: 'sm',

  // ============ ТИПОГРАФИКА ============
  fontFamily: typography.fontFamily.base,
  fontSizes: typography.fontSizes,
  headings: typography.headings,

  // ============ КОМПОНЕНТЫ ============
  components: {
    // Кнопки
    Button: buttonConfig,
    ActionIcon: actionIconConfig,

    // Инпуты
    TextInput: textInputConfig,
    PasswordInput: passwordInputConfig,
    Select: selectConfig,
    MultiSelect: multiSelectConfig,
    Pill: pillConfig,
    Text: textConfig,

    // Табы
    Tabs: tabsConfig,
  },
})
