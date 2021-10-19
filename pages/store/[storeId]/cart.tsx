import React, { FC } from "react"
import Head from "next/head"
import Link from "next/link"
import { NoSsr } from "@mui/material"

import Layout from "components/Layout"
import CartComp from "components/Cart"
import { useStore } from "models/cart"
import { StoreProps } from "pages/store/[storeId]"
import { useTranslations } from "models/i18n"
import { PageTranslations } from "translation"

export { getServerSideProps } from "pages/store/[storeId]"


export type Translations = PageTranslations<StoreProps>
const Cart: FC<StoreProps> = (props) => {
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
          : <NoCartFound store={store} />
        }
      </NoSsr>
    </Layout>
  </>)
}
export default Cart

const NoCartFound: FC<StoreProps> = ({ store }) => (<>
  <h1>No items in cart</h1>
  <p>No items in cart for {store.name}.</p>
  <p><Link href={`/store/${store.id}`} passHref><a>Return to store {store.name}</a></Link></p>
</>)
