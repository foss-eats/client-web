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
          title: ({ store }) => `Cart – ${store.name}`
        },
        index: {
          title: ({ store }) => `Menu – ${store.name}`,
        }
      }
    },
    stores: {
      byPostalCode: {
        index: {
          title: ({ postalCode }) => `Restaurants that deliver to postal code ${postalCode}`,
        }
      }
    }
  }
})
