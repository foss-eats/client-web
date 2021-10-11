
export const isBrowser = typeof window !== "undefined" && window.document

export const clientSide = <T>(f: () => T): T | null => {
  return isBrowser
    ? f()
    : null
}
