// src/theme.ts (главный файл - остается на своем месте)
import { createTheme } from "@mantine/core";

// Импортируем токены из папки theme/
import { colors, typography } from "./shared/config/theme";

// Импортируем конфигурации компонентов
import { buttonConfig, actionIconConfig, textInputConfig, passwordInputConfig, selectConfig, multiSelectConfig, pillConfig, textConfig, tabsConfig } from "./shared/ui";


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

  primaryColor: "primaryBlue",
  black: "#212529",

  // ============ ОТСТУПЫ ============
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  // ============ СКРУГЛЕНИЯ ============
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  defaultRadius: "sm",

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
});