import { createModel } from "@rematch/core"
import Decimal from "decimal.js"
import { compose, not, omit, whereEq } from "ramda"

import { Maybe, Tagged } from "lib/util"
import { MenuItem, StoreId } from "lib/types"
import { RootModel, useSelector } from "models"


export type CartItem = {
  item: MenuItem,
  amount: number,
  id: CartItemId,
}


declare const cartItemIdTag: unique symbol
export type CartItemId = Tagged<number, typeof cartItemIdTag>

export const emptyCart = {
  items: [] as CartItem[],
  len: 0,
  total: "0",
  nextId: 0 as CartItemId,
}
export type Cart = typeof emptyCart

const initialState = {} as Record<StoreId, Cart>
export type State = typeof initialState

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

export const useStore = (store: Maybe<StoreId>): Maybe<Cart> =>
  useSelector(s => store ? s.cart[store] : emptyCart)

type Endo<A> = (a: A) => A

const mapCart = (storeId: StoreId, f: Endo<Cart>) => (state: State): State => {
  const newCart = f(state[storeId] || emptyCart)
  newCart.len = newCart.items.length
  if (newCart.len === 0) {
    return omit([storeId], state)
  } else {
    newCart.total = sumItems(newCart.items)
    return {
      ...state,
      [storeId]: newCart,
    }
  }
}

const hasAmount: (item: CartItem) => boolean = compose(not, whereEq({ amount: 0 }))

const mapItems =  (storeId: StoreId, f: Endo<CartItem>) => mapCart(storeId, ({ items, ...cart }) => {
  const newItems = items.map(f).filter(hasAmount)
  return {
    ...cart,
    items: newItems,
    total: sumItems(newItems),
  }
})

const changeAmount = (state: State, { storeId, itemId , amount }: ChangeAmountPayload): State => mapItems(storeId, item => ({
  ...item,
  amount: itemId === item.id ? amount : item.amount,
}))(state)

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
      }
    })(state),
    remove: (state, payload: RemovePayload) => changeAmount(state, { amount: 0, ...payload }),
    changeAmount,
  },
})
