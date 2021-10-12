import { Decimal } from "decimal.js"


export type ErrorResponse = {
  type: "error",
  msg: string,
}

export type StoreHeader = {
  id: string,
  name: string,
  postalCodes: string[]
}

export type StoreData = StoreHeader & {
  quisine: string[],
  menu: MenuCategory[],
}

export type MenuCategory = {
  id: string,
  name: string,
  items: MenuItem[],
}

export type MenuItem = {
  id: string,
  name: string,
  price: Decimal,
}
