import { identity } from "ramda"

import { Translations } from "translation"


export default identity<Translations>({
  pages: {
    store: {
      byId: {
        cart: {
          title: (storeName) => `Cart${storeName ? ` – ${storeName}` : ""}`
        },
        index: {
          title: (storeName) => `Menu – ${storeName}`,
        }
      }
    },
    stores: {
      byPostalCode: {
        index: {
          title: (postalCode) => `Restaurants that deliver to postal code ${postalCode}`,
        }
      }
    }
  }
})
