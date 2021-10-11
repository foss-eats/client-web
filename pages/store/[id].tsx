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

import Layout from "components/layout"
import { getStoreData, MenuItem, StoreData } from "lib/store"


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
      <h1>{store.name}</h1>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
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
    </Layout>
  </>)
}
export default Store

const MenuItemEntry: FC<MenuItem & { storeId: string }> = ({ id, name, price, storeId }) => (
  <ListItem key={`item-${id}`}>
    <ListItemButton 
        role={undefined}
        onClick={() => {}}>
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
    props: {
      store
    }
  }
}
