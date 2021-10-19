import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Paper, Grid } from "@mui/material"

import { PageTranslations } from "translation"
import { useTranslations } from "models/i18n"
import { EmptyObject } from "lib/util"
import Layout from "components/Layout"
import AddressSearch from "components/AddressSearch"


export type Translations = PageTranslations<Props>
export type Props = EmptyObject
const Home: React.FC<Props> = (props) => {
  const translations = useTranslations().pages.index
  const router = useRouter()
  return (<>
    <Head>
      <title>{translations.title(props)}</title>
    </Head>
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
  </>)
}
export default Home
