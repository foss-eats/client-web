import { StoreData, StoreHeader } from "lib/types"
import { contains, pick, where, whereEq } from "ramda"
import { stores } from "./dummyData"
import { ensureServerSide } from "./util"


const storeToHeader: (store: StoreData) => StoreHeader = pick(["id", "name", "postalCodes"])

export const getStoresForPostalCode = (postalCode: string): Promise<StoreHeader[]> => ensureServerSide(() => {
  const headers = stores.filter(where({ postalCodes: contains(postalCode) }))
    .map(storeToHeader)
  return Promise.resolve(headers)
})

export const getStoreData = (id: string): Promise<StoreData> => ensureServerSide(() => {
  const store = stores.find(whereEq({ id }))
  return store
    ? Promise.resolve(store)
    : Promise.reject(`no store found for id:${id}`)
})
