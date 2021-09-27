import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import '../utils/i18n'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { globalCss } from '../stitches.config'
import ErrorBoundary from '../components/ErrorBoundary'

const globalStyles = globalCss({
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily:
      "'VT323', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    fontSize: '100%',
    color: '$white90',
    background: '$bg',
  },

  '*': {
    boxSizing: 'border-box',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  '@bp1': {
    'html, body': {
      fontSize: '120%',
    },
  },

  '@bp2': {
    'html, body': {
      fontSize: '140%',
    },
  },
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  globalStyles()
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
