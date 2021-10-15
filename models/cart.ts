import { createModel } from "@rematch/core"
import { RootModel } from "models"
import { MenuItem } from "lib/types"
import { Decimal } from "decimal.js"
import { reduce, reject, whereEq } from "ramda"


export type CartItem = {
  menuItem: MenuItem,
  id: number,
}

export type State = typeof initialState

const initialState = {
  items: [] as CartItem[],
  len: 0 as number,
  total: new Decimal(0),
  nextId: 0 as number,
}

const sumItems = reduce<CartItem, Decimal>((sum, { menuItem: { price } }) => sum.add(price), new Decimal(0))

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    clear: () => initialState,
    add: ({ items, nextId, ...state }, menuItem: MenuItem) => {
      const newItems =  [...items, { menuItem, id: nextId }]
      return {
        ...state,
        nextId: nextId + 1,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
    },
    remove: ({ items, ...state }, id: number) => {
      const newItems = reject(whereEq({ id }), items)
      return {
        ...state,
        items: newItems,
        len: newItems.length,
        total: sumItems(newItems),
      }
    },
  },
});
