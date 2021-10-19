import React, { PropsWithChildren } from "react"
import { GetServerSidePropsContext, Redirect as ServerSideRedirect } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { always } from "ramda"

import { AnyObject, NextFC, splitSide } from "lib/util"


const toRedirect = (res: RedirectResult): ServerSideRedirect | null => {
  if (!res) {
    return null
  } else if (typeof res === "string") {
    return {
      statusCode: 302,
      destination: res,
    }
  } else {
    return res
  }
}

const toDestination = (res: RedirectResult): string | null => {
  if (!res) {
    return null
  } else if (typeof res === "string") {
    return res
  } else {
    return res.destination
  }
}

type RedirectResult = ServerSideRedirect | string | null
type UseRedirectArgs<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = {
  ifServer?: (context: GetServerSidePropsContext<Q>) => RedirectResult,
  ifClient?: () => RedirectResult,
}
export const useRedirect = <Q extends ParsedUrlQuery = ParsedUrlQuery>(args: UseRedirectArgs<Q>): NextFC<PropsWithChildren<AnyObject>, Q> => {
  const { ifServer = always(null), ifClient = always(null) } = args
  const Redirect: NextFC<PropsWithChildren<AnyObject>, Q> = ({ children }) => {
    const router = useRouter()
    const body = () => React.createElement(React.Fragment, { children })
    return splitSide(
      body,
      () => {
        const destination = toDestination(ifClient())
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
    const redirect = toRedirect(ifServer(ctx))
    if (redirect) {
      return { redirect }
    } else {
      return { props: {} }
    }
  }
  
  return Redirect
}
