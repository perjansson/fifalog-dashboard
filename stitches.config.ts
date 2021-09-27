import { createStitches } from '@stitches/react'

const SPACE_UNIT = '1rem'
const calcSpace = (space: number) => `calc(${space} * ${SPACE_UNIT})`

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      red: '#c3073f',
      white90: '#F5F5F5',
      white80: '#EEEEEE',
      white70: '#E0E0E0',
      white60: '#BDBDBD',
      white50: '#9E9E9E',
      white40: '#757575',
      white30: '#616161',
      white20: '#424242',
      white10: '#212121',
      black90: '#212121',
      black80: '#424242',
      black70: '#616161',
      black60: '#757575',
      black50: '#9E9E9E',
      black40: '#BDBDBD',
      black30: '#E0E0E0',
      black20: '#EEEEEE',
      black10: '#F5F5F5',
      error: '$red',
    },
    fontSizes: {
      xSmall: '0.5rem',
      small: '0.75rem',
      base: '1rem',
      large: '1.25rem',
      xlarge: '3rem',
      xxlarge: '4rem',
      xxxlarge: '6rem',
    },
    space: {
      spaceUnit: '1rem',
      space1: calcSpace(0.25),
      space2: calcSpace(0.5),
      space3: calcSpace(0.75),
      space4: calcSpace(1),
      space5: calcSpace(1.25),
      space6: calcSpace(1.5),
      space7: calcSpace(1.75),
      space8: calcSpace(2),
      space9: calcSpace(2.25),
      space10: calcSpace(2.5),
      space11: calcSpace(2.75),
      space12: calcSpace(3),
      space13: calcSpace(3.25),
      space14: calcSpace(3.5),
      space15: calcSpace(3.75),
      space16: calcSpace(4),
    },
  },
  media: {
    bp1: '(min-width: 768px)',
    bp2: '(min-width: 1024px)',
  },
  utils: {
    marginX: (value: string | number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: string | number) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
})

export const darkTheme = createTheme('dark-theme', {
  colors: {
    primary: '$white90',
    secondary: '$white60',
    contrast: '$white20',
    bg: '$black90',
  },
})

export const lightTheme = createTheme('light-theme', {
  colors: {
    primary: '$black90',
    secondary: '$black60',
    contrast: '$black20',
    bg: '$white90',
  },
})
