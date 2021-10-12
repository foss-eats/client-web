import { init, Models } from "@rematch/core"
import cart from "models/cart"


export type RootModel = Models<RootModel> & {
  cart: typeof cart,
}

export const store = init<RootModel>({
  models: {
    cart,
  }
})
