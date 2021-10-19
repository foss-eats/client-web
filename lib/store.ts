import { StoreData, StoreHeader, StoreId } from "lib/types"
import { contains, pick, where, whereEq } from "ramda"
import { stores } from "./dummyData"
import { ensureServerSide, Maybe } from "./util"


const storeToHeader: (store: StoreData) => StoreHeader = pick(["id", "name", "postalCodes"])

export const getStoresForPostalCode = (postalCode: string): Promise<StoreHeader[]> => ensureServerSide(() => {
  const headers = stores.filter(where({ postalCodes: contains(postalCode) }))
    .map(storeToHeader)
  return Promise.resolve(headers)
})

export const getStoreData = (id: Maybe<StoreId>): Promise<Maybe<StoreData>> => ensureServerSide(() => {
  if (!id) return Promise.resolve(undefined)
  const store = stores.find(whereEq({ id }))
  return Promise.resolve(store)
})
