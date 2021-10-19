import { Translations as TPagesHome } from "pages/index"
import { Translations as TPagesStore } from "pages/store/[storeId]"
import { Translations as TPagesStoreCart } from "pages/store/[storeId]/cart"
import { Translations as TPagesStores } from "pages/stores/[postalCode]"


export type PageTranslations<P> = {
  title: (props: P) => string,
}

export type TranslationsSelector<T> = (t: Translations) => T

export type Translations = {
  pages: {
    index: TPagesHome,
    store: {
      byId: {
        index: TPagesStore,
        cart: TPagesStoreCart,
      },
    },
    stores: {
      byPostalCode: {
        index: TPagesStores,
      },
    },
  },
}
