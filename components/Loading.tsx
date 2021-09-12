import React from 'react'
import FadeIn from 'react-fade-in'
import Loader from 'react-loader-spinner'

import { styled } from '../stitches.config'

const StyledLoader = styled(Loader, {
  margin: 'auto',
  svg: {
    width: '80px',
    height: '80px',
    path: {
      stroke: '$secondary',
    },
  },

  '@bp1': {
    svg: {
      width: '200px',
      height: '200px',
    },
  },
  '@bp2': {
    svg: {
      width: '400px',
      height: '400px',
    },
  },
})

export const Loading: React.FC = () => {
  return (
    <FadeIn delay={1500} transitionDuration={1000}>
      <StyledLoader type="TailSpin" />
    </FadeIn>
  )
}
