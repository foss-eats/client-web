

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
  price: string,
  options: (MenuItemOption[]) | (MenuItemOption[]),
}
export type MenuItemOptionGroup = {
  type: "group"
  name: string,
  options: MenuItemOption[],
}
export type MenuItemOption = MenuItemOptionToggle | MenuItemOptionChoice
export type MenuItemOptionToggle = {
  type: "toggle",
  id: string,
  name: string,
  price: string,
}
export type MenuItemOptionChoice = {
  type: "choice",
  id: string,
  name: string,
  options: { name: string, price: string }[],
}
