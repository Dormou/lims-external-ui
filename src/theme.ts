import {
  Button,
  createTheme,
  Input,
  rem,
  Tabs,
  Text,
  type MantineColorsTuple,
} from '@mantine/core'

import classes from './components/Tabs.module.css'

const rossetiBlue: MantineColorsTuple = [
  '#ebf7ff',
  '#d5eafa',
  '#a6d4f7',
  '#75bef6',
  '#409ef5',
  '#1f75c4',
  '#005B9C', // Primary
  '#0070BF', // Hover
  '#00497D', // Pressed
  '#002859',
]

const errorRed: MantineColorsTuple = [
  '#FFF5F5',
  '#FFE3E3',
  '#FFC9C9',
  '#FFA8A8',
  '#FF8787',
  '#FF6B6B',
  '#FA5252',
  '#F03E3E',
  '#E03131',
  '#DC3545',
]

// todo добавить complementary, successful, warning цвета

export const theme = createTheme({
  colors: {
    rossetiBlue,
    errorRed,
  },

  primaryColor: 'rossetiBlue',

  defaultRadius: 'xs',

  fontFamily: 'PF Din Text Cond Pro, sans-serif',

  headings: {
    fontFamily: 'DIN Pro, sans-serif',
    sizes: {
      h1: { fontSize: rem(36), fontWeight: '700', lineHeight: '1.2' },
      h2: { fontSize: rem(32), fontWeight: '500', lineHeight: '1.2' },
      h3: { fontSize: rem(20), fontWeight: '400', lineHeight: '1.2' },
      h4: { fontSize: rem(18), fontWeight: '300', lineHeight: '1.2' },
    },
  },

  components: {
    Button: Button.extend({
      vars: (_, props) => {
        if (props.variant === 'filled') {
          return {
            root: {
              '--button-bg': '#005B9C',
              '--button-hover': '#0070BF',
              '--button-active': '#00497D',
              '--button-disabled-bg': '#ADB5BD',
              '--button-disabled-color': '#FFFFFF',
              '--button-fz': rem(24),
              '--button-radius': rem(8),
              '--button-padding-x': rem(24),
            },
          }
        }

        if (props.variant === 'outline') {
          return {
            root: {
              '--button-color': '#005B9C',
              '--button-bd': `${rem(1.5)} solid #005B9C`,
              '--button-bg': '#FFFFFF',
              '--button-hover': '#EBF3F7',
              '--button-active': '#C1D9E7',
              '--button-disabled-bg': '#E9ECEF',
              '--button-disabled-color': '#ADB5BD',
              '--button-disabled-bd': `${rem(1.5)} solid #ADB5BD`,
              '--button-fz': rem(24),
              '--button-radius': rem(8),
              '--button-padding-x': rem(24),
            },
          }
        }
        return { root: {} }
      },
      styles: {
        root: {
          fontFamily: 'PF Din Text Cond Pro, sans-serif',
          fontWeight: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 24px',
          height: '48px',
        },
      },
    }),

    Title: {
      styles: {
        root: {
          textTransform: 'none',
        },
      },
    },

    Text: Text.extend({
      vars: (_, props) => {
        if (props.variant === 'emphasis') {
          return {
            root: {
              '--text-fz': rem(16),
              '--text-fw': '400',
              '--text-lh': '1.2',
            },
          }
        }
        if (props.size === 'md') {
          return {
            root: {
              '--text-fz': rem(16),
              '--text-fw': '300',
              '--text-lh': '1.2',
            },
          }
        }
        return { root: {} }
      },
    }),

    InputWrapper: {
      styles: {
        label: {
          fontFamily: 'PF Din Text Cond Pro, sans-serif',
          fontWeight: 300,
          fontSize: rem(14),
          marginBottom: rem(4),
        },
        error: {
          fontFamily: 'PF Din Text Cond Pro, sans-serif',
          fontSize: rem(12),
          color: '#DC3545',
          marginTop: rem(4),
        },
      },
    },

    Input: Input.extend({
      vars: () => {
        return {
          wrapper: {
            '--input-radius': rem(8),
            '--input-padding-x': rem(16),
            '--input-height': rem(48),
          },
        }
      },
      styles: {
        input: {
          fontFamily: 'PF Din Text Cond Pro, sans-serif',
          fontWeight: 300,
          fontSize: rem(16),
          border: `${rem(1)} solid #CED4DA`,
          paddingTop: rem(12),
          paddingBottom: rem(12),
        },
      },
    }),

    TextInput: {
      defaultProps: {
        errorColor: 'error',
      },
      styles: () => ({
        input: {
          // Активное состояние (focus)
          '&:focus-within': {
            borderColor: '#005B9C',
          },
          // Состояние disabled (как у outline кнопки)
          '&:disabled': {
            backgroundColor: '#E9ECEF',
            borderColor: '#ADB5BD',
            color: '#ADB5BD',
            opacity: 1,
          },
          // Состояние ошибки
          '&[data-error]': {
            borderColor: '#DC3545',
          },
        },
      }),
    },

    Tabs: Tabs.extend({
      classNames: classes,
    }),

    Tooltip: {
      defaultProps: {
        withArrow: true,
        radius: 'sm',
      },
      styles: {
        tooltip: {
          backgroundColor: '#ffffff', // Белый фон
          color: '#005B9C', // Синий текст (Primary)
          border: '1px solid #ADB5BD',
          fontSize: '14px',
          fontFamily: 'PF Din Text Cond Pro, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '8px 12px',
        },
        arrow: {
          border: '1px solid #ADB5BD',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})
