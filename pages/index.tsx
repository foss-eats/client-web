import React from "react"
import { useRouter } from "next/router"
import { Paper, Grid } from "@mui/material"

import { Empty } from "lib/util"
import Layout from "components/Layout"
import AddressSearch from "components/AddressSearch"


export type HomeProps = Empty
const Home: React.FC<HomeProps> = () => {
  const router = useRouter()
  return (
    <Layout home>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "30em",
        }}
      >
        <Paper elevation={3}>
          <AddressSearch onSubmit={postalCode => router.push(`/stores/${postalCode}`)} />
        </Paper>
      </Grid>
    </Layout>
  )
}
export default Home
