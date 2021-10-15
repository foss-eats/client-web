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

import { MenuItem, StoreData } from "lib/types"
import { getStoreData } from "lib/store"
import Layout from "components/layout"
import { useDispatch } from "models"


export type StoreProps = {
  store?: StoreData,
}
const Store = ({ store }: StoreProps) => {
  if (!store) return <>No store found</>
  return (<>
    <Head>
      <title>{store.name}</title>
    </Head>
    <Layout>
      <h1>{store.name}</h1>
      <List
        sx={{
          flexGrow: 1,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {store.menu.map(({ id, name, items }) => (
          <li key={`section-${id}`}>
            <ul>
              <ListSubheader sx={{ top: "64px" }} >{name}</ListSubheader>
              {items.map((item) => <MenuItemEntry key={item.id} storeId={store.id} {...item} />)}
            </ul>
          </li>
        ))}
      </List>
    </Layout>
  </>)
}
export default Store

const MenuItemEntry: FC<MenuItem & { storeId: string }> = (item) => {
  const { id, name, price, storeId } = item
  const { cart } = useDispatch()
  return (
    <ListItem key={`item-${id}`}>
      <ListItemButton 
          role={undefined}
          onClick={() => cart.add(item)}>
        <ListItemAvatar>
          <Avatar alt={name} src={`/images/store/${storeId}/menu/${id}.jpg`} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`${price} €`} />
      </ListItemButton>
    </ListItem>
  )
}

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
