import React, { FC } from "react"
import Head from "next/head"
import Box from "@mui/system/Box"

import AppBar from "components/appbar"


export type LayoutProps = {
  children: React.ReactNode,
  home?: boolean,
}
const Layout: FC<LayoutProps> = ({ children, home }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!home ? <AppBar /> : <></>}
      <main>{children}</main>
    </Box>
  )
}
export default Layout
