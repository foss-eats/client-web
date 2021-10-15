import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import * as redux from 'react-redux'

import cart from "models/cart"


export type RootModel = Models<RootModel> & {
  cart: typeof cart,
}

export const store = init<RootModel>({
  models: {
    cart,
  }
})


type Selector<A> = (state: RematchRootState<RootModel>) => A
type UseSelector = <A>(selector: Selector<A>) => A

export const useSelector = redux.useSelector as UseSelector

export const useDispatch = (): RematchDispatch<RootModel> => store.dispatch
