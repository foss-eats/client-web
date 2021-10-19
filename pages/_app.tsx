import { Provider } from 'react-redux'
import { AppProps } from "next/app"
import React from "react"

import "styles/global.css"
import { store } from 'models'

export type Props = AppProps
const App: React.FC<Props> = ({ Component, pageProps }) => (
  <Provider {...{ store }}>
    <Component {...pageProps} />
  </Provider>
)
export default App
