import { prop, pick, where, equals, contains } from "ramda"


export type StoreHeader = {
  id: string,
  name: string,
  postalCodes: string[]
}
export type StoreData = StoreHeader

// TODO: move to backend and stuff
const stores: StoreData[] = [
  {
    id: "1",
    name: "Pizzeria",
    postalCodes: ["28203"],
  },
  {
    id: "2",
    name: "Asia Laden",
    postalCodes: ["28203", "28204"],
  },
  {
    id: "3",
    name: "Burger",
    postalCodes: ["28204"],
  },
]

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