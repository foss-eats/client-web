import React, { FC } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import Decimal from "decimal.js"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"

import Layout from "components/layout"
import { useDispatch, useSelector } from "models"
import { CartItem, emptyCart, WithStoreId } from "models/cart"
import { StoreId } from "lib/types"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"


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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {items.map(item => <ItemRow key={item.id} store={store} {...item} />)}
            <TotalRow {...{ total }} />
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  </>)
}
export default Cart

const ItemRow: FC<CartItem & WithStoreId> = ({ store, id, item: { name, price } }) => {
  const { remove } = useDispatch().cart
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{price} €</TableCell>
      <TableCell align="right">
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => remove({ store, item: id })}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const TotalRow: FC<{ total: Decimal }> = ({ total }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell />
    <TableCell align="right">{total.toPrecision(2).toString()} €</TableCell>
    <TableCell align="right" />
  </TableRow>
)


export interface StoreUrlParams extends ParsedUrlQuery {
  id: string,
}
export const getServerSideProps: GetServerSideProps<CartProps, StoreUrlParams> = async ({ params }) => ({
  props: {
    store: params?.id as StoreId | undefined,
  },
})
