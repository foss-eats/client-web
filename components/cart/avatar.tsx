import React, { FC } from "react"
import Avatar from "@mui/material/Avatar"
import RoomServiceIcon from '@mui/icons-material/RoomService'
import Badge from "@mui/material/Badge"
import styled from "@mui/system/styled"
import Fab from "@mui/material/Fab"

import { useSelector } from "models"
import { useRouter } from "next/router"
import { WithStoreId } from "models/cart"


const CartAvatar: FC<WithStoreId> = ({ store }) => {
  const itemCount = useSelector(s => s.cart[store]?.len)
  return itemCount
    ? (
      <FixedBottom>
        <CartAvatarComponent {...{ itemCount, store }} />
      </FixedBottom>
    )
    : null
}
export default CartAvatar


const FixedBottom = styled(Fab)({
  position: 'fixed',
  zIndex: 1,
  bottom: 30,
  left: 0,
  right: 0,
  margin: '0 auto',
})

const SmallAvatar = styled(Avatar)({
  width: 22,
  height: 22,
  fontSize: "1em",
})

const CartAvatarComponent: FC<{ itemCount: number } & WithStoreId> = ({ itemCount, store }) => {
  const router = useRouter()
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={<SmallAvatar>{itemCount}</SmallAvatar>}
      onClick={() => router.push(`/store/${store}/cart`)}
    >
      <Avatar>
        <RoomServiceIcon />
      </Avatar>
    </Badge>
  )
}
