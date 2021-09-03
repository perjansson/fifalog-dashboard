import { useEffect } from 'react'

export function useWindowHeightOnResize(): void {
  useEffect(() => {
    const handleResizeWindow = () => {
      console.log('on resize')
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    handleResizeWindow()

    window.addEventListener('resize', handleResizeWindow)
    return () => window.removeEventListener('resize', handleResizeWindow)
  }, [])
}
