import React, { Dispatch, FC, SetStateAction, useState } from "react"
import Dialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog"


type DialogProps = Omit<MuiDialogProps, "open">

type UseDialog = [
  FC<DialogProps>,
  Dispatch<SetStateAction<boolean>>,
  boolean,
]

export const useDialog = (initiallyOpen = false): UseDialog => {
  const [open, setOpen] = useState(initiallyOpen)

  const Comp: FC<DialogProps> = ({ children, onClose, ...props }) => (
    <Dialog
      {...props}
      open={open}
      onClose={(...args) => {
        setOpen(false)
        onClose && onClose(...args)
      }}
    >
      {children}
    </Dialog>
  )

  return [Comp, setOpen, open]
}
