import { createModel } from "@rematch/core"
import Decimal from "decimal.js"
import { omit, reject, whereEq } from "ramda"

import { MenuItem, StoreId } from "lib/types"
import { Tagged } from "lib/util"
import { RootModel, useSelector } from "models"


export type CartItem = {
  item: MenuItem,
  amount: number,
  id: CartItemId,
}

export type State = typeof initialState

declare const cartItemIdTag: unique symbol
export type CartItemId = Tagged<number, typeof cartItemIdTag>

export const emptyCart = {
  items: [] as CartItem[],
  len: 0,
  total: "0",
  nextId: 0 as CartItemId,
}
const initialState = {} as Record<StoreId, typeof emptyCart>

const sumItems = (items: CartItem[]) => {
  const sum = items.reduce<Decimal>((sum, item) => {
    const itemSubtotal = new Decimal(item.item.price).mul(item.amount)
    return sum.add(itemSubtotal)
  }, new Decimal(0))
  return sum.toPrecision(2).toString()
}

export type WithStoreId = {
  storeId: StoreId,
}

type WithCartItemId = {
  itemId: CartItemId,
}

type AddPayload = WithStoreId & {
  item: MenuItem,
  amount: number,
}

type RemovePayload = WithStoreId & WithCartItemId

type ChangeAmountPayload = WithStoreId & WithCartItemId & {
  amount: number,
}

export const useStore = (store: StoreId | undefined) => useSelector(s => store ? s.cart[store] : emptyCart) || emptyCart

type Endo<A> = (a: A) => A

const mapCart = (storeId: StoreId, f: Endo<typeof emptyCart>) =>
  (state: typeof initialState): typeof initialState => ({
    ...state,
    [storeId]: f(state[storeId] || emptyCart),
  })

const mapItems =  (storeId: StoreId, f: Endo<CartItem>) => mapCart(storeId, ({ items, ...cart }) => {
  const newItems = items.map(f)
  return {
    ...cart,
    items: newItems,
    total: sumItems(newItems),
  }
})

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    clear: (state, { storeId }: WithStoreId) => omit([storeId], state),
    add: (state, { storeId, item, amount }: AddPayload) => mapCart(storeId, ({ nextId, items, ...cart }) => {
      const newItems = [...items, { item, id: nextId, amount }]
      return {
        ...cart,
        nextId: nextId + 1 as CartItemId,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
    })(state),
    remove: (state, { storeId, itemId }: RemovePayload) => mapCart(storeId, ({ items, ...cart }) => {
      const newItems = reject(whereEq({ id: itemId }), items)
      return {
        ...cart,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
    })(state),
    changeAmount: (state, { storeId, itemId , amount }: ChangeAmountPayload) => mapItems(storeId, item => ({
      ...item,
      amount: itemId === item.id ? amount : item.amount,
    }))(state),
  },
})
