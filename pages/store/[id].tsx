import * as React from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from "querystring"

import Layout from '../../components/layout'
import { getAllStoreIds, getStoreData, StoreData } from '../../lib/store'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

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
        
      </article>
    </Layout>
  )
}
export default Store

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllStoreIds()
  return {
    paths: ids.map(id => `/store/${id}`),
    fallback: false
  }
}

export interface StoreUrlParams extends ParsedUrlQuery {
  id: string,
}
export const getStaticProps: GetStaticProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  const store = await getStoreData(params.id)
  return {
    props: {
      store
    }
  }
}
