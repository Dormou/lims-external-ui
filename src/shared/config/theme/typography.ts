import { rem } from "@mantine/core";

export const typography = {
  fontFamily: {
    base: 'PF Din Text Cond Pro, sans-serif',
    heading: 'DIN Pro, sans-serif',
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    xxl: rem(28),
  },

  headings: {
    fontFamily: 'DIN Pro, sans-serif',
    sizes: {
      h1: { fontSize: rem(36), fontWeight: '700', lineHeight: '1.2' },
      h2: { fontSize: rem(32), fontWeight: '500', lineHeight: '1.2' },
      h3: { fontSize: rem(20), fontWeight: '400', lineHeight: '1.2' },
      h4: { fontSize: rem(18), fontWeight: '300', lineHeight: '1.2' },
    },
  },
};