import React, { FC } from "react"
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

import { StoreHeader } from "lib/types"
import { getStoresForPostalCode } from "lib/store"
import Layout from "components/Layout"


export type StoreProps = {
  postalCode?: string,
  stores?: StoreHeader[],
}
const Stores = ({ stores, postalCode }: StoreProps) => (<>
  <Head>
    <title>{postalCode}</title>
  </Head>
  <Layout>
    {stores
      ? <StoreList stores={stores} />
      : <>No store found for postal code {postalCode}</>
    }
  </Layout>
</>)
export default Stores


const StoreList: FC<{ stores: StoreHeader[] }> = ({ stores }) => (
  <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
    {stores.map((store, i) => <StoreEntry key={store.id} divider={i !== 0} {...store} />)}
  </List>
)

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
