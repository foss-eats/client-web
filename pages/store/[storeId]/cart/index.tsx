import React, { FC } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"

import Layout from "components/Layout"
import { useDispatch } from "models"
import { CartItem, useStore, WithStoreId } from "models/cart"
import styles from "./styles.module.sass"
import { StoreUrlParams } from "pages/store/[storeId]"
import NumberInput from "components/NumberInput"


export type CartProps = WithStoreId
const Cart: FC<CartProps> = ({ storeId }) => {
  const { items, total } = useStore(storeId)
  return (<>
    <Head>
      <title>cart</title>
    </Head>
    <Layout>
      <TableContainer component={Paper}>
        <Table className={styles.cartTable}>
          <TableBody>
            {items.map(item => (
              <ItemRow key={item.id} storeId={storeId} {...item} />
            ))}
            <TotalRow {...{ total }} />
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  </>)
}
export default Cart

const ItemRow: FC<CartItem & WithStoreId> = ({ storeId, id, amount, item: { name, price } }) => {
  const { remove, changeAmount } = useDispatch().cart
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className={styles.alignEnd}>{price} €</TableCell>
      <TableCell className={styles.alignEnd}>
        <NumberInput
          value={amount}
          min={0}
          onChange={n => changeAmount({ storeId, itemId: id, amount: n })}
        />
      </TableCell>
      <TableCell className={styles.alignEnd}>
        <IconButton
            aria-label="delete"
            onClick={() => storeId && remove({ storeId, itemId: id })}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const TotalRow: FC<{ total: string }> = ({ total }) => (
  <TableRow>
    <TableCell />
    <TableCell className={styles.alignEnd}>{total} €</TableCell>
    <TableCell />
    <TableCell />
  </TableRow>
)


export const getServerSideProps: GetServerSideProps<CartProps, StoreUrlParams> = async ({ params }) => {
  if (!params) throw new Error(`No params provided`)
  return {
    props: {
      storeId: params?.storeId,
    },
  }
}
