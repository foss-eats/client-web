import * as React from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from "querystring"

import Layout from '../../components/layout'
import { getAllStoreIds, getStoresForPostalCode, StoreHeader, storeHeaders } from '../../lib/store'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Link from "next/link";
import { prop, uniq } from "ramda";

export type StoreProps = {
  postalCode?: string,
  stores?: StoreHeader[],
}
const Stores = ({ stores, postalCode }: StoreProps) => {
  if (!stores) return <>No store found for postal code {postalCode}</>
  return (
    <Layout home>
      <Head>
        <title>{postalCode}</title>
      </Head>
      {stores.map(store => <StoreEntry key={store.id} {...store} />)}
    </Layout>
  )
}
export default Stores

const StoreEntry: React.FC<StoreHeader> = ({ name, id }) => (
  <Link href={`/store/${id}`}>
    <article>
      <h1 className={utilStyles.headingXl}>{name}</h1>
    </article>
  </Link>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = await storeHeaders()
  return {
    paths: uniq(stores.flatMap(prop("postalCodes")))
      .map(postalCode => `/stores/${postalCode}`),
    fallback: false
  }
}

export interface StoreUrlParams extends ParsedUrlQuery {
  postalCode: string,
}
export const getStaticProps: GetStaticProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  return {
    props: {
      postalCode: params.postalCode,
      stores: await getStoresForPostalCode(params.postalCode),
    }
  }
}
