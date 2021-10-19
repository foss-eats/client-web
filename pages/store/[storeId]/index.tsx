import React, { FC } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { List, ListSubheader, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar } from "@mui/material"

import { MenuItem, StoreData, StoreId } from "lib/types"
import { getStoreData } from "lib/store"
import Layout from "components/Layout"
import CartAvatar from "components/Cart/Avatar"
import { useDispatch } from "models"
import { WithStoreId } from "models/cart"
import { useTranslations } from "models/i18n"


export type Translations = {
  title: (name: string) => string,
}
export type StoreProps = {
  store: StoreData,
}
const Store: FC<StoreProps> = ({ store }) => {
  const translations = useTranslations().pages.store.byId.index
  return (<>
    <Head>
      <title>{translations.title(store.name)}</title>
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
      <CartAvatar storeId={store.id} />
    </Layout>
  </>)
}
export default Store

const MenuItemEntry: FC<MenuItem & WithStoreId> = ({ storeId, ...item }) => {
  const { id, name, price } = item
  const { cart } = useDispatch()
  return (
    <ListItem>
      <ListItemButton 
          role={undefined}
          onClick={() => cart.add({ storeId, item, amount: 1 })}>
        <ListItemAvatar>
          <Avatar alt={name} src={`/images/store/${storeId}/menu/${id}.jpg`} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`${price} €`} />
      </ListItemButton>
    </ListItem>
  )
}

export type StoreUrlParams = ParsedUrlQuery & {
  storeId: StoreId,
}
export const getServerSideProps: GetServerSideProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  const store = await getStoreData(params?.storeId)
  return store
    ? { props: { store } }
    : { notFound: true }
}
