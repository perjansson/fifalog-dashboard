import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../stitches.config'

type Theme = typeof darkTheme | typeof lightTheme | undefined

export const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>(undefined)
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }

    const prefersColorSchemeEventListener = (event: Event) => {
      const newTheme = (event as MediaQueryListEvent).matches
        ? darkTheme
        : lightTheme
      setTheme(newTheme)
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', prefersColorSchemeEventListener)
    return () =>
      window.removeEventListener('change', prefersColorSchemeEventListener)
  }, [])

  return theme
}
