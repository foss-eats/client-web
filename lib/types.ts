import { Tagged } from "lib/util"

export type ErrorResponse = {
  type: "error",
  msg: string,
}

declare const storeIdTag: unique symbol
export type StoreId = Tagged<string, typeof storeIdTag>

export type StoreHeader = {
  id: StoreId,
  name: string,
  postalCodes: string[]
}

export type StoreData = StoreHeader & {
  quisine: string[],
  menu: MenuCategory[],
}

declare const menuCategoryIdTag: unique symbol
export type MenuCategoryId = Tagged<string, typeof menuCategoryIdTag>


export type MenuCategory = {
  id: MenuCategoryId,
  name: string,
  items: MenuItem[],
}

declare const menuItemIdTag: unique symbol
export type MenuItemId = Tagged<string, typeof menuItemIdTag>

export type MenuItem = {
  id: MenuItemId,
  name: string,
  price: string,
}
