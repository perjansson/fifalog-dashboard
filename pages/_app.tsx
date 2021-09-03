import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
