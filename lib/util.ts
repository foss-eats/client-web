import { Decimal } from "decimal.js"
import { ReactElement } from "react"

export const isBrowser = typeof window !== "undefined" && window.document

export const splitSide = <T>(server: () => T, client: () => T): T => {
  return isBrowser
    ? client()
    : server()
}

export const clientSide = <T>(f: () => T): T | null => {
  return splitSide(() => null, f)
}

export const ensureServerSide = <T>(f: () => T): T => {
  return splitSide(f, () => { throw new Error(`tried to execute ${f.name} on client side`) })
}

export const serverSide = <T>(f: () => T): T | null => {
  return splitSide(f, () => null)
}

export const noop = () => { return }

export type Empty = Record<keyof unknown, never>

export const guard = (cond: unknown, f: () => ReactElement): ReactElement | null => {
  if (cond) {
    return f()
  } else {
    return null
  }
}

declare const __tag: unique symbol
export type Tagged<A, T> = A & { [__tag]: T }

export const ZERO = new Decimal(0)
