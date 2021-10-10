import { prop, pick, where, equals, contains } from "ramda"


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
  options: Record<string, MenuItemOption[]>,
}
export type MenuItemOption = MenuItemOptionToggle | MenuItemOptionChoice
export type MenuItemOptionToggle = {
  type: "toggle",
  name: string,
  price: string,
}
export type MenuItemOptionChoice = {
  type: "choice",
  name: string,
  options: { name: string, price: string }[],
}

// TODO: move to backend and stuff
const stores: StoreData[] = [1,2,3,4,5,6,7,8,9].flatMap(i => [
  {
    id: `${i * 3}`,
    name: `Pizzeria ${i}`,
    postalCodes: ["28203"],
    quisine: ["Pizza", "Italienisch"],
    menu: [],
  },
  {
    id: `${i * 3 + 1}`,
    name: `Asia Laden ${i}`,
    postalCodes: ["28203", "28204"],
    quisine: ["Asiatisch", "Chinesisch"],
    menu: [],
  },
  {
    id: `${i * 3 + 2}`,
    name: `Burger ${i}`,
    postalCodes: ["28204"],
    quisine: ["Burger", "US Americanisch"],
    menu: [],
  },
])

export const storeHeaders = (): Promise<StoreHeader[]> =>
  Promise.resolve(stores.map(pick(["id", "name", "postalCodes"])))

export const getAllStoreIds = (): Promise<string[]> => 
  Promise.resolve(stores.map(prop("id")))

export const getStoresForPostalCode = (postalCode: string): Promise<StoreHeader[]> =>
  Promise.resolve(stores.filter(where({ postalCodes: contains(postalCode) })))

export const getStoreData = async (id: string): Promise<StoreData> => {
  let store = stores.find(where({id: equals(id)}))
  return store
    ? Promise.resolve(store)
    : Promise.reject(`no store found with id ${id}`)
}