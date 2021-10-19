import { WebStorage } from "redux-persist"
import { always } from "ramda"


export const noopStorage: WebStorage = {
  getItem: always(Promise.resolve(null)),
  setItem: always(Promise.resolve()),
  removeItem: always(Promise.resolve()),
}
export const noopStorageConfig = {
  storage: noopStorage,
  key: "noop",
}
