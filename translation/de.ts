import { identity } from "ramda"

import { Translations } from "translation"


export default identity<Translations>({
  pages: {
    index: {
      title: () => `foss-eats`,
    },
    store: {
      byId: {
        cart: {
          title: ({ store }) => `Einkaufskorb – ${store.name} | foss-eats`
        },
        index: {
          title: ({ store }) => `Menü – ${store.name} | foss-eats`,
        }
      }
    },
    stores: {
      byPostalCode: {
        index: {
          title: ({ postalCode }) => `Restaurants die in der PLZ ${postalCode} liefern`,
        }
      }
    }
  }
})
