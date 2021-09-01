import { useEffect } from 'react'

export function useWindowHeightOnResize() {
  useEffect(() => {
    const handleResizeWindow = () => {
      console.log('on resize')
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    handleResizeWindow()

    window.addEventListener('resize', handleResizeWindow)
    return () => window.removeEventListener('resize', handleResizeWindow)
  }, [])
}
