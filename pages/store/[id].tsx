import React, { FC } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import List from "@mui/material/List"
import ListSubheader from "@mui/material/ListSubheader"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/system/Box"

import { MenuItem, StoreData } from "lib/types"
import { getStoreData } from "lib/store"
import Layout from "components/layout"


export type StoreProps = {
  store?: StoreData,
}
const Store = ({ store }: StoreProps) => {
  if (!store) return <>No store found</>
  return (<>
    <Head>
      <title>{store.name}</title>
    </Head>
    <Layout fullscreen>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100%",
        }}>
        <Box>
          <h1>{store.name}</h1>
        </Box>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            flexGrow: 1,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {store.menu.map(({ id, name, items }) => (
            <li key={`section-${id}`}>
              <ul>
                <ListSubheader>{name}</ListSubheader>
                {items.map((item) => <MenuItemEntry key={item.id} storeId={store.id} {...item} />)}
              </ul>
            </li>
          ))}
        </List>
      </Box>
    </Layout>
  </>)
}
export default Store

const MenuItemEntry: FC<MenuItem & { storeId: string }> = ({ id, name, price, storeId }) => (
  <ListItem key={`item-${id}`}>
    <ListItemButton 
        role={undefined}
        onClick={() => { console.info("TODO: add product to basket") }}>
      <ListItemAvatar>
        <Avatar alt={name} src={`/images/store/${storeId}/menu/${id}.jpg`} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`${price} €`} />
    </ListItemButton>
  </ListItem>
)

export interface StoreUrlParams extends ParsedUrlQuery {
  id: string,
}
export const getServerSideProps: GetServerSideProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  const store = await getStoreData(params.id)
  return {
    props: { store: store }
  }
}
