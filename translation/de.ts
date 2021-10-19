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
          title: ({ store }) => `Warenkorb – ${store.name} | foss-eats`,
          emptyCart: {
            headline: `Leerer Warenkorb`,
            description: ({ store }) => `Dein Warenkorb für ${store.name} ist leer.`,
            linkBody: ({ store }) => `Zurück zu ${store.name}`,
          },
        },
        index: {
          title: ({ store }) => `Menü – ${store.name} | foss-eats`,
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
        cart: { title: `Was essen?` },
        delivery: { title: `Wohin liefern?` },
        payment: { title: `Wie bezahlen?` },
      },
    },
  },
})
