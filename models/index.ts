import persistPlugin from "@rematch/persist"
import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import * as redux from 'react-redux'

import { noopStorageConfig } from "lib/redux/storage"
import cart, { storage as cartStorage } from "models/cart"
import i18n, { storage as i18nStorage } from "models/i18n"
import { path } from "ramda"


export type RootModel = Models<RootModel> & {
  cart: typeof cart,
  i18n: typeof i18n,
}

export type RootState = RematchRootState<RootModel>

export const store = init<RootModel>({
  models: {
    cart,
    i18n,
  },
  plugins: [
    persistPlugin<RootState, RootModel>(noopStorageConfig, {
      cart: {
        key: "cart",
        storage: cartStorage,
      },
      i18n: {
        key: "i18n",
        storage: i18nStorage,
      },
    }),
  ]
})


type Selector<A> = (state: RootState) => A
type UseSelector = {
  <A>(selector: Selector<A>): A,
  <K0 extends keyof RootState>(k0: K0): RootState[K0],
  <K0 extends keyof RootState, K1 extends keyof RootState[K0]>(k0: K0, k1: K1): RootState[K0][K1],
  <K0 extends keyof RootState, K1 extends keyof RootState[K0], K2 extends keyof RootState[K0][K1]>(k0: K0, k1: K1, k2: K2): RootState[K0][K1][K2],
}
export const useSelector: UseSelector = ((...args: string[] | [Selector<unknown>]) => {
  const sel = typeof args[0] === "function"
    ? args[0] as Selector<unknown>
    : path(args as string[])
  return redux.useSelector(sel)
}) as UseSelector

export const useDispatch = (): RematchDispatch<RootModel> => store.dispatch
