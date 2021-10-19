
export type Endo<A> = (a: A) => A

export const noop = () => { return }

export const guard = <A>(cond: unknown, f: () => A): A | null => {
  if (cond) {
    return f()
  } else {
    return null
  }
}
