import React, { FC } from "react"
import { RoomService } from "@mui/icons-material"
import { Avatar, Badge, Fab } from "@mui/material"
import { styled } from "@mui/system"

import { useSelector } from "models"
import { useRouter } from "next/router"
import { WithStoreId } from "models/cart"


export type Props = WithStoreId
const CartAvatar: FC<Props> = ({ storeId }) => {
  const itemCount = useSelector(s => s.cart[storeId]?.len)
  return itemCount
    ? (
      <FixedBottom>
        <CartAvatarComponent {...{ itemCount, storeId }} />
      </FixedBottom>
    )
    : null
}
export default CartAvatar


const FixedBottom = styled(Fab)({
  position: "fixed",
  zIndex: 1,
  bottom: 30,
  left: 0,
  right: 0,
  margin: "0 auto",
})

const SmallAvatar = styled(Avatar)({
  width: 22,
  height: 22,
  fontSize: "1em",
})

const CartAvatarComponent: FC<{ itemCount: number } & WithStoreId> = ({ itemCount, storeId }) => {
  const router = useRouter()
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={<SmallAvatar>{itemCount}</SmallAvatar>}
      onClick={() => router.push(`/store/${storeId}/cart`)}
    >
      <Avatar>
        <RoomService />
      </Avatar>
    </Badge>
  )
}
