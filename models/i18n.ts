import { createModel } from "@rematch/core"

import { Maybe } from "lib/util"
import { noopStorage } from "lib/redux/storage"
import { RootModel, useSelector } from "models"
import { Translations } from "translation"
import de from "translation/de"
import en from "translation/en"


export type Lang = "en" | "de"

export type State = {
  lang: Maybe<Lang>,
}

export const useLang = () => useSelector("i18n", "lang")

export const useTranslations = (): Translations => {
  const lang = useLang() || "de"
  switch (lang) {
    case "en": return en
    default: return de
  }
}

export const storage = noopStorage

export default createModel<RootModel>()({
  state: {} as State,
  reducers: {
    changeLang: (state, lang: Lang) => ({ ...state, lang }),
  },
})
