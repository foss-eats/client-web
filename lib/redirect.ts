import React, { PropsWithChildren } from "react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { always } from "ramda"

import { Empty, NextFC, splitSide } from "lib/util"


type RedirectResult = string | null
type UseRedirectArgs<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = {
  ifServer?: (context: GetServerSidePropsContext<Q>) => RedirectResult,
  ifClient?: () => RedirectResult,
}
export const useRedirect = <Q extends ParsedUrlQuery = ParsedUrlQuery>(args: UseRedirectArgs<Q>): NextFC<PropsWithChildren<Empty>, Q> => {
  const { ifServer = always(null), ifClient = always(null) } = args
  const Redirect: NextFC<PropsWithChildren<Empty>, Q> = ({ children }) => {
    const router = useRouter()
    const body = () => React.createElement(React.Fragment, { children })
    return splitSide(
      body,
      () => {
        const destination = ifClient()
        if (destination) {
          router.push(destination)
          return null
        } else {
          return body()
        }
      })
  }
  
  Redirect.getServerSideProps = async (ctx) => {
    const destination = ifServer(ctx)
    if (destination) {
      return {
        redirect: {
          statusCode: 302,
          destination,
        }
      }
    } else {
      return { props: {} }
    }
  }
  
  return Redirect
}
