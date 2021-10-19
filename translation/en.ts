import { identity } from "ramda"

import { Translations } from "translation"


export default identity<Translations>({
  model: {
    i18n: {
      lang: {
        de: `de`,
        en: `en`,
      }
    },
  },
  pages: {
    index: {
      title: () => `foss-eats`,
    },
    store: {
      byId: {
        cart: {
          title: ({ store }) => `Cart – ${store.name} | foss-eats`,
          emptyCart: {
            headline: `No items in cart`,
            description: ({ store }) => `No items in cart for ${store.name}.`,
            linkBody: ({ store }) => `Return to store ${store.name}`,
          },
        },
        index: {
          title: ({ store }) => `Menu – ${store.name} | foss-eats`,
        }
      }
    },
    stores: {
      byPostalCode: {
        index: {
          title: ({ postalCode }) => `Restaurants – in ${postalCode} | foss-eats`,
        },
      },
    },
  },
  components: {
    Cart: {
      index: {
        cart: { title: `What to eat?` },
        delivery: { title: `Where to deliver to?` },
        payment: { title: `How to pay?` },
      },
    },
  },
})
