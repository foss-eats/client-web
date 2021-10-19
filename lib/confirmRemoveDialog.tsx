import React, { FC, useState } from "react"
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useDialog } from "components/Dialog"
import { StoreId } from "lib/types"
import { CartItem } from "models/cart"
import { useDispatch } from "models"


type UseRemoveDialog = [
  FC,
  (item: CartItem) => void,
]

export const useConfirmRemoveDialog = (storeId: StoreId): UseRemoveDialog => {
  const [Comp, setOpen] = useDialog()
  const [item, setItem] = useState<CartItem | null>(null)
  const { remove } = useDispatch().cart

  const close = () => {
    setOpen(false)
    setItem(null)
  }

  const NewComp: FC = () => (item && (
    <Comp onClose={close}>
      <DialogTitle>
        Remove {item.item.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to remove {item.item.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Keep</Button>
        <Button onClick={() => {
          close()
          remove({ storeId, itemId: item.id })
        }} autoFocus>Remove</Button>
      </DialogActions>
    </Comp>
  ))

  const openRemoveDialog = (item: CartItem) => {
    setItem(item)
    setOpen(true)
  }

  return [NewComp, openRemoveDialog]
}
