import { Provider } from 'react-redux'
import { AppProps } from "next/app"
import React from "react"

import "styles/global.css"
import { store } from 'models'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider {...{ store }}>
    <Component {...pageProps} />
  </Provider>
)
export default App
