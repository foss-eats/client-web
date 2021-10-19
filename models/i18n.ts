import { createModel } from "@rematch/core"

import { Maybe } from "lib/util"
import { RootModel, useSelector } from "models"


export type Lang = "en" | "de"

export type State = {
  lang: Maybe<Lang>,
}

export const useLang = () => useSelector("i18n", "lang")

export default createModel<RootModel>()({
  state: {} as State,
  reducers: {
    changeLang: (state, lang: Lang) => ({ ...state, lang }),
  },
})
