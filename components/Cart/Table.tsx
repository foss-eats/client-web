import React, { FC } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"

import { useConfirmRemoveDialog } from "lib/confirmRemoveDialog"
import NumberInput from "components/NumberInput"
import { useDispatch } from "models"
import { Cart as CartData, CartItem, WithStoreId } from "models/cart"
import { Props } from "./index"
import styles from "./Table.module.sass"


const CartTable: FC<Props> = ({ store, cart: { items, total } }) => {
  const [RemoveDialog, confirmRemove] = useConfirmRemoveDialog(store.id)
  const { changeAmount } = useDispatch().cart
  return (<>
    <RemoveDialog />
    <TableContainer component={Paper}>
        <Table className={styles.cartTable}>
          <TableBody>
            {items.map(item => (
              <ItemRow
                key={item.id}
                storeId={store.id}
                onAmountChange={amount => {
                  if (amount === 0) {
                    confirmRemove(item)
                  } else {
                    changeAmount({ storeId: store.id, itemId: item.id, amount })
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
export default CartTable

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
