import { createModel } from "@rematch/core"
import { RootModel } from "models"
import { MenuItem } from "lib/types"
import { Decimal } from "decimal.js"
import { reduce, whereEq } from "ramda"


export type CartItem = {
  menuItem: MenuItem,
  id: number,
}

export type State = {
  items: CartItem[],
  total: Decimal,
  nextId: number,
}

const initialState: State = {
  items: [],
  total: new Decimal(0),
  nextId: 0,
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
        total: sumItems(newItems),
      }
    },
    remove: ({ items, ...state }, id: string) => {
      const newItems = items.filter(whereEq({ id }))
      return {
        ...state,
        items: newItems,
        total: sumItems(newItems),
      }
    },
  },
});
