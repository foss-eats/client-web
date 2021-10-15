import React, { FC } from "react"
import Head from "next/head"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"

import { guard } from "lib/util"
import AppBar from "components/appbar"
import Footer from "components/footer"
import CartAvatar from "components/cart/avatar"


export type LayoutProps = {
  children: React.ReactNode,
  home?: boolean,
  fullscreen?: boolean,
  noBell?: boolean,
}
const Layout: FC<LayoutProps> = ({ children, home, noBell }) => {
  return (<>
    <CssBaseline />
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {guard(!home, () => <AppBar />)}
    <Container sx={{ pt: home ? 0 : "64px" }}>
      {children}
    </Container>
    <Footer></Footer>
    {guard(!noBell, () => <CartAvatar />)}
  </>)
}
export default Layout
