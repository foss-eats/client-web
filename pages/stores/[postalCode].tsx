import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import Layout from "components/layout"
import { getStoresForPostalCode, StoreHeader } from "lib/store"


export type StoreProps = {
  postalCode?: string,
  stores?: StoreHeader[],
}
const Stores = ({ stores, postalCode }: StoreProps) => {
  if (!stores) return <>No store found for postal code {postalCode}</>
  return (
    <Layout>
      <Head>
        <title>{postalCode}</title>
      </Head>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {stores.map((store, i) => <StoreEntry key={store.id} divider={i !== 0} {...store} />)}
      </List>
    </Layout>
  )
}
export default Stores

const StoreEntry: React.FC<StoreHeader & { divider: boolean }> = ({ name, id, divider }) => {
  const router = useRouter()
  return (
    <>
      {divider ? <Divider variant="inset" component="li" /> : <></>}
      <ListItem alignItems="flex-start">
        <ListItemButton 
            role={undefined}
            onClick={() => router.push(`/store/${id}`)}>
          <ListItemAvatar>
            <Avatar alt={name} src={`/images/store/${id}.jpg`} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export interface StoreUrlParams extends ParsedUrlQuery {
  postalCode: string,
}
export const getServerSideProps: GetServerSideProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  return {
    props: {
      postalCode: params.postalCode,
      stores: await getStoresForPostalCode(params.postalCode),
    }
  }
}
