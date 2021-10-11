import React from "react"
import { useRouter } from "next/router"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

import Layout from "components/layout"
import AddressSearch from "components/addressSearch"


export type HomeProps = {}
const Home: React.FC<HomeProps> = ({}) => {
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
