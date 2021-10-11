import React, { FC } from "react"
import Head from "next/head"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"

import AppBar from "components/appbar"


export type LayoutProps = {
  children: React.ReactNode,
  home?: boolean,
  fullscreen?: boolean,
}
const Layout: FC<LayoutProps> = ({ children, home, fullscreen }) => {
  const height = fullscreen ? "100%" : undefined
  return (<>
    <CssBaseline />
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {!home ? <AppBar /> : <></>}
    <Container
      sx={{ pt: "50px" }}
      style={{ height }}
    >
      {children}
    </Container>
  </>)
}
export default Layout
