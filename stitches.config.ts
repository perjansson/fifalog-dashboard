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
      white90: '#e5e5e5',
      white60: '#999999',
      black: '#000000',
      black90: '#1a1a1d',
      red: '#c3073f',
      primary: '$white90',
      bg: '$black90',
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
