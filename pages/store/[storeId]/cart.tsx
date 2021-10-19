import React, { FC } from "react"
import Head from "next/head"
import { NoSsr } from "@mui/material"

import Layout from "components/Layout"
import CartComp from "components/Cart"
import { useStore } from "models/cart"
import { Props } from "pages/store/[storeId]"
import { useTranslations } from "models/i18n"
import { PageTranslations } from "translation"
import EmptyCart, { Translations as EmptyCartTranslations } from "components/Cart/EmptyCart"

export { getServerSideProps } from "pages/store/[storeId]"


export type Translations = PageTranslations<Props> & {
  emptyCart: EmptyCartTranslations,
}
const Cart: FC<Props> = (props) => {
  const { store } = props
  const cart = useStore(store?.id)
  const translations = useTranslations().pages.store.byId.cart

  return (<>
    <Head>
      <title>{translations.title(props)}</title>
    </Head>
    <Layout>
      <NoSsr>
        {cart
          ? <CartComp store={store} cart={cart} />
          : <EmptyCart store={store} />
        }
      </NoSsr>
    </Layout>
  </>)
}
export default Cart
