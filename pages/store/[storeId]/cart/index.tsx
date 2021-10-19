import React, { FC } from "react"
import Head from "next/head"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Paper, NoSsr } from "@mui/material"

import Layout from "components/Layout"
import NumberInput from "components/NumberInput"
import { useDispatch } from "models"
import { useRedirect } from "lib/redirect"
import { useParams } from "lib/util"
import { useConfirmRemoveDialog } from "lib/confirmRemoveDialog"
import { Cart as CartData, CartItem, useStore, WithStoreId } from "models/cart"
import styles from "./styles.module.sass"
import { StoreUrlParams } from "pages/store/[storeId]"


const Cart: FC = () => {
  const { storeId } = useParams<StoreUrlParams>()
  const cart = useStore(storeId)
  const Redirect = useRedirect({
    ifClient: () => !cart ? `/store/${storeId}` : null,
  })

  return (<>
    <Head>
      <title>cart</title>
    </Head>
    <Layout>
      <Redirect>
        <NoSsr>
          <CartTable storeId={storeId} {...cart as CartData} />
        </NoSsr>
      </Redirect>
    </Layout>
  </>)
}
export default Cart


const CartTable: FC<CartData & WithStoreId> = ({ items, total, storeId }) => {
  const [RemoveDialog, confirmRemove] = useConfirmRemoveDialog(storeId)
  const { changeAmount } = useDispatch().cart
  return (<>
    <RemoveDialog />
    <TableContainer component={Paper}>
        <Table className={styles.cartTable}>
          <TableBody>
            {items.map(item => (
              <ItemRow
                key={item.id}
                storeId={storeId}
                onAmountChange={amount => {
                  if (amount === 0) {
                    confirmRemove(item)
                  } else {
                    changeAmount({ storeId, itemId: item.id, amount })
                  }
                }}
                {...item}
              />
            ))}
            <TotalRow {...{ total }} />
          </TableBody>
        </Table>
    </TableContainer>
  </>)
}

type ItemRowProps = CartItem & WithStoreId & {
  onAmountChange: (amount: number) => unknown,
}
const ItemRow: FC<ItemRowProps> = ({ storeId, onAmountChange, ...item }) => {
  const { remove } = useDispatch().cart
  const { id, amount, item: { name, price } } = item

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className={styles.alignEnd}>{price} €</TableCell>
      <TableCell className={styles.alignEnd}>
        <NumberInput
          value={amount}
          min={0}
          onChange={onAmountChange}
        />
      </TableCell>
      <TableCell className={styles.alignEnd}>
        <IconButton
            aria-label="delete"
            onClick={() => remove({ storeId, itemId: id })}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

type TotalRowProps = Pick<CartData, "total">
const TotalRow: FC<TotalRowProps> = ({ total }) => (
  <TableRow>
    <TableCell />
    <TableCell className={styles.alignEnd}>
      {total} €
    </TableCell>
    <TableCell />
    <TableCell />
  </TableRow>
)
