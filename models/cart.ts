import { createModel } from "@rematch/core"
import { RootModel } from "models"
import { Decimal } from "decimal.js"
import { omit, reduce, reject, whereEq } from "ramda"

import { MenuItem, StoreId } from "lib/types"
import { Tagged, ZERO } from "lib/util"


export type CartItem = {
  item: MenuItem,
  id: CartItemId,
}

export type State = typeof initialState

declare const cartItemIdTag: unique symbol
export type CartItemId = Tagged<number, typeof cartItemIdTag>

export const emptyCart = {
  items: [] as CartItem[],
  len: 0,
  total: ZERO,
  nextId: 0 as CartItemId,
}
const initialState = {} as Record<StoreId, typeof emptyCart>

const sumItems = reduce<CartItem, Decimal>((sum, item) => sum.add(item?.item?.price || ZERO), ZERO)

export type WithStoreId = {
  store: StoreId,
}

type AddPayload = WithStoreId & {
  item: MenuItem,
}

type RemovePayload = WithStoreId & {
  item: CartItemId,
}

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    clear: (state, { store }: WithStoreId) => omit([store], state),
    add: (state, { store, item }: AddPayload) => {
      const { nextId, items, ...cart } = state[store] || emptyCart

      const newItems = [...items, { item, id: nextId }]
      const newCart = {
        ...cart,
        nextId: nextId + 1 as CartItemId,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
      return {
        ...state,
        [store]: newCart,
      }
    },
    remove: (state, { store, item }: RemovePayload) => {
      const { items, ...cart } = state[store] || emptyCart

      const newItems = reject(whereEq({ id: item }), items)
      const newCart = {
        ...cart,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
      return {
        ...state,
        [store]: newCart,
      }
    },
  },
})
