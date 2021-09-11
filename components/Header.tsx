import { styled } from '../stitches.config'

export const Header = styled('h1', {
  marginTop: 0,
  textAlign: 'center',
  fontSize: '$xlarge',
  '@bp1': {
    fontSize: '$xxlarge',
  },
  '@bp2': {
    fontSize: '$xxxlarge',
    marginY: 0,
  },
})
