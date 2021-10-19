import { Translations as TPagesStore } from "pages/store/[storeId]"
import { Translations as TPagesStoreCart } from "pages/store/[storeId]/cart"
import { Translations as TPagesStores } from "pages/stores/[postalCode]"

export type Translations = {
  pages: {
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
