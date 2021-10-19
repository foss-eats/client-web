import React, { FC } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"

import { StoreData, StoreId } from "lib/types"
import { getStoreData } from "lib/store"
import Layout from "components/Layout"
import CartAvatar from "components/Cart/Avatar"
import StoreMenu from "components/Store/Menu"
import { useTranslations } from "models/i18n"
import { PageTranslations } from "translation"


export type Translations = PageTranslations<Props>
export type Props = {
  store: StoreData,
}
const Store: FC<Props> = (props) => {
  const { store } = props
  const translations = useTranslations().pages.store.byId.index
  return (<>
    <Head>
      <title>{translations.title(props)}</title>
    </Head>
    <Layout>
      <h1>{store.name}</h1>
      <StoreMenu {...props} />
      <CartAvatar storeId={store.id} />
    </Layout>
  </>)
}
export default Store

export type StoreUrlParams = ParsedUrlQuery & {
  storeId: StoreId,
}
export const getServerSideProps: GetServerSideProps<Props, StoreUrlParams> = async ({ params }) => {
  const store = await getStoreData(params?.storeId)
  return store
    ? { props: { store } }
    : { notFound: true }
}
