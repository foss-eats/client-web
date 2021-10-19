import React, { FC } from "react"
import { List, ListSubheader, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar } from "@mui/material"

import { MenuItem } from "lib/types"
import { useDispatch } from "models"
import { WithStoreId } from "models/cart"
import { Props } from "pages/store/[storeId]"


const StoreMenu: FC<Props> = ({ store }) => {
  return (
    <List
      sx={{
        flexGrow: 1,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {store.menu.map(({ id, name, items }) => (
        <li key={`section-${id}`}>
          <ul>
            <ListSubheader sx={{ top: "64px" }} >{name}</ListSubheader>
            {items.map((item) => <MenuItemEntry key={item.id} storeId={store.id} {...item} />)}
          </ul>
        </li>
      ))}
    </List>
  )
}
export default StoreMenu


const MenuItemEntry: FC<MenuItem & WithStoreId> = ({ storeId, ...item }) => {
  const { id, name, price } = item
  const { cart } = useDispatch()
  return (
    <ListItem>
      <ListItemButton 
          role={undefined}
          onClick={() => cart.add({ storeId, item, amount: 1 })}>
        <ListItemAvatar>
          <Avatar alt={name} src={`/images/store/${storeId}/menu/${id}.jpg`} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`${price} €`} />
      </ListItemButton>
    </ListItem>
  )
}
