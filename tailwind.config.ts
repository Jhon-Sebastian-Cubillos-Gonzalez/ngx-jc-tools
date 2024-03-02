import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: [
    'selector'
  ],
  content: [
    './libs/**/*.{html,ts}',
    './apps/**/*.{html,ts}',
    './node_modules/tailwindcss-dark-mode/prefers-dark.js',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...fontFamily.sans,
        ],
        serif: [
          'Lato',
          ...fontFamily.serif,
        ],
      },
      transitionTimingFunction: {
        'aura-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      zIndex: {
        '1': '1'
      }
    },
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
  ],
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd'
    ],
    borderColor: [
      'dark',
      'dark-disabled',
      'dark-focus',
      'dark-focus-within'
    ],
    textColor: [
      'dark',
      'dark-hover',
      'dark-active',
      'dark-placeholder'
    ]
  }
} satisfies Config

