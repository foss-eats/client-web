import * as React from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import AddressSearch from "../components/addressSearch"


export type HomeProps = {}
export default ({}: HomeProps) => {
  const router = useRouter()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <AddressSearch onSubmit={postalCode => router.push(`/stores/${postalCode}`)} />
      </section>
    </Layout>
  )
}