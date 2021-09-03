import React from 'react'
import FadeIn from 'react-fade-in'
import Loader from 'react-loader-spinner'

interface Props {
  className?: string;
}

export const Loading: React.FC<Props> = ({ className }) => {
  return (
    <FadeIn delay={1500} transitionDuration={1000} className={className}>
      <Loader type="TailSpin" color="rgba(255, 255, 255, 0.8)" />
    </FadeIn>
  )
}
