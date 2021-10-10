import * as React from "react"
import Head from "next/head"
import styles from "components/layout.module.css"
import utilStyles from "styles/utils.module.css"

const name = "[Your Name]"
export const siteTitle = "Next.js Sample Website"

export type LayoutProps = {
  children: React.ReactNode,
  home?: boolean,
}
const Layout = ({ children, home }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>{children}</main>
    </div>
  )
}
export default Layout
