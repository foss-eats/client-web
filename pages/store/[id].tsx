import React from "react"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

import Layout from "components/layout"
import { getStoreData, StoreData } from "lib/store"
import Head from "next/head"


export type StoreProps = {
  store?: StoreData,
}
const Store = ({ store }: StoreProps) => {
  if (!store) return <>No store found</>
  return (
    <Layout>
      <Head>
        <title>{store.name}</title>
      </Head>
      <article>
        <h1>{store.name}</h1>
      </article>
    </Layout>
  )
}
export default Store

export interface StoreUrlParams extends ParsedUrlQuery {
  id: string,
}
export const getServerSideProps: GetServerSideProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  const store = await getStoreData(params.id)
  return {
    props: {
      store
    }
  }
}
