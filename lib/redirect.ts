import React, { PropsWithChildren } from "react"
import { GetServerSidePropsContext, Redirect as ServerSideRedirect } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { always } from "ramda"

import { AnyObject, NextFC, splitSide } from "lib/util"


type RedirectComp<Q extends ParsedUrlQuery = ParsedUrlQuery> = NextFC<PropsWithChildren<AnyObject>, Q>
type UseRedirectArgs<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  ifServer?: (context: GetServerSidePropsContext<Q>) => ServerSideRedirect | undefined,
  ifClient?: () => string | undefined,
}
export const useRedirect = <Q extends ParsedUrlQuery = ParsedUrlQuery>({
  ifServer = always(undefined),
  ifClient = always(undefined),
}: UseRedirectArgs<Q>): RedirectComp<Q> => {

  const Redirect: RedirectComp<Q> = ({ children }) => {
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
      },
    )
  }
  
  Redirect.getServerSideProps = async (ctx) => {
    const redirect = ifServer(ctx)
    if (redirect) {
      return { redirect }
    } else {
      return { props: {} }
    }
  }
  
  return Redirect
}
