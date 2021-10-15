import React, { FC } from "react"
import Head from "next/head"
import DeleteIcon from '@mui/icons-material/Delete'

import Layout from "components/layout"
import { useDispatch, useSelector } from "models"
import { CartItem } from "models/cart"


const Cart: FC = () => {
  const { items, total } = useSelector(({ cart: { items, total }}) => ({ items, total }))
  return (<>
    <Head>
      <title>cart</title>
    </Head>
    <Layout noBell>
      {items.map(item => <ItemEntry key={item.id} {...item} />)}
      {total.toPrecision(2).toString()} €
    </Layout>
  </>)
}
export default Cart

const ItemEntry: FC<CartItem> = ({ id, menuItem: { name, price } }) => {
  const { remove } = useDispatch().cart
  return (
    <div>
      {name}: {price} €
      <DeleteIcon onClick={() => remove(id)}/>
    </div>
  )
}
