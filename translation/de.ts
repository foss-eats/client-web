import { identity } from "ramda"

import { Translations } from "translation"


export default identity<Translations>({
  pages: {
    store: {
      byId: {
        cart: {
          title: (storeName) => `Einkaufskorb${storeName ? ` – ${storeName}` : ""}`
        },
        index: {
          title: (storeName) => `Menü – ${storeName}`,
        }
      }
    },
    stores: {
      byPostalCode: {
        index: {
          title: (postalCode) => `Restaurants die in der PLZ ${postalCode} liefern`,
        }
      }
    }
  }
})
