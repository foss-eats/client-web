import persistPlugin from "@rematch/persist"
import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import storage from 'redux-persist/lib/storage/session'
import * as redux from 'react-redux'

import cart from "models/cart"


export type RootModel = Models<RootModel> & {
  cart: typeof cart,
}

export const store = init<RootModel>({
  models: {
    cart,
  },
  plugins: [
    persistPlugin({
      key: "root",
      storage,
    }),
  ]
})


type Selector<A> = (state: RematchRootState<RootModel>) => A
type UseSelector = <A>(selector: Selector<A>) => A

export const useSelector = redux.useSelector as UseSelector

export const useDispatch = (): RematchDispatch<RootModel> => store.dispatch
