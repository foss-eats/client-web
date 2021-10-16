import React, { FC } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import DeleteIcon from '@mui/icons-material/Delete'
import { ParsedUrlQuery } from "querystring"

import Layout from "components/layout"
import { useDispatch, useSelector } from "models"
import { CartItem, emptyCart, WithStoreId } from "models/cart"
import { StoreId } from "lib/types"


export type CartProps = {
  store?: StoreId,
}
const Cart: FC<CartProps> = ({ store }) => {
  if (!store) return (<>no cart for store {store}</>)
  const { items, total } = useSelector(s => s.cart[store] || emptyCart)
  return (<>
    <Head>
      <title>cart</title>
    </Head>
    <Layout>
      {items.map(item => <ItemEntry key={item.id} store={store} {...item} />)}
      {total.toPrecision(2).toString()} €
    </Layout>
  </>)
}
export default Cart

const ItemEntry: FC<CartItem & WithStoreId> = ({ store, id, item: { name, price } }) => {
  const { remove } = useDispatch().cart
  return (
    <div>
      {name}: {price} €
      <DeleteIcon onClick={() => remove({ store, item: id })}/>
    </div>
  )
}


export interface CartUrlParams extends ParsedUrlQuery {
  id: string,
}
export const getServerSideProps: GetServerSideProps<CartProps, CartUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  return {
    props: { store: params.id as StoreId }
  }
}
