import React, { FC } from "react"
import Head from "next/head"
import { CssBaseline, Container } from "@mui/material"

import { guard } from "lib/function"
import AppBar from "components/AppBar"
import Footer from "components/Footer"


export type LayoutProps = {
  children: React.ReactNode,
  home?: boolean,
  fullscreen?: boolean,
}
const Layout: FC<LayoutProps> = ({ children, home }) => {
  return (<>
    <CssBaseline />
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {guard(!home, () => (<AppBar />))}
    <Container sx={{ pt: home ? 0 : "64px" }}>
      {children}
    </Container>
    <Footer></Footer>
  </>)
}
export default Layout
