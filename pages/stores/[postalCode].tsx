import * as React from "react"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

import Layout from "components/layout"
import { getStoresForPostalCode, StoreHeader } from "lib/store"
import Head from "next/head"
import utilStyles from "styles/utils.module.css"
import Link from "next/link"


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

export interface StoreUrlParams extends ParsedUrlQuery {
  postalCode: string,
}
export const getServerSideProps: GetServerSideProps<StoreProps, StoreUrlParams> = async ({ params }) => {
  if (!params) return { props: {} }
  return {
    props: {
      postalCode: params.postalCode,
      stores: await getStoresForPostalCode(params.postalCode),
    }
  }
}
