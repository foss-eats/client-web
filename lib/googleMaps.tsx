import React, { FC, PropsWithChildren, useState } from "react"
import Head from "next/head"
import debounce from "lodash.debounce"
import { clientSide, EmptyObject } from "lib/util"


const DEBOUNCE_TIME = 300

const services = {
  places: clientSide(() => {
    const dummyDiv = document.createElement("div")
    return new google.maps.places.PlacesService(dummyDiv)
  }),
  autocomplete: clientSide(() => new google.maps.places.AutocompleteService())
}

// reexport these aweful type names
export enum PlacesServiceStatus {
  INVALID_REQUEST = "INVALID_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  OK = "OK",
  OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
  REQUEST_DENIED = "REQUEST_DENIED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  ZERO_RESULTS = "ZERO_RESULTS",
}
export type AutocompletionRequest = google.maps.places.AutocompletionRequest
export type AutocompletePrediction = google.maps.places.AutocompletePrediction
export type PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest
export type PlaceResult = google.maps.places.PlaceResult

type ServiceMethod<Req, Res> = (req: Req, callback: (res: Res | null, status: PlacesServiceStatus) => void) => void
type ServiceMethodReq<S, M extends keyof S> = S[M] extends ServiceMethod<infer Req, unknown> ? Req : never
type ServiceMethodRes<S, M extends keyof S> = S[M] extends ServiceMethod<unknown, infer Res> ? Res : never

const callGoogleService = <S, M extends keyof S>(service: S | null, m: M, req: ServiceMethodReq<S, M>): Promise<ServiceMethodRes<S, M>> =>
  new Promise((resolve, reject) => {
    if (!service) {
      reject("google services not initialized.")
    } else {
      // There may be a way to get this to typecheck without any but I don"t know it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const method = service[m] as any as ServiceMethod<any, any>
      method.call(service, req, (res, status) => {
        if (status === PlacesServiceStatus.OK) {
          resolve(res as ServiceMethodRes<S, M>)
        } else {
          reject(status)
        }
      })
    }
  })


export const GoogleMapsContext: FC<PropsWithChildren<EmptyObject>> = ({ children }) => (
  <>
    <Head>
      <script async src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS}&libraries=places`}></script>
    </Head>
    {children}
  </>
)

type UseAutocomplete = [
  google.maps.places.AutocompletePrediction[],
  (input: string) => void,
  boolean,
  () => void,
]
type UseAutocompleteSettings = Omit<AutocompletionRequest, "input">

export const useAutocomplete = (settings: UseAutocompleteSettings = {}): UseAutocomplete => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<AutocompletePrediction[]>([])

  const autocomplete = async (input: string) => {
    setLoading(true)
    try {
      const opts = await callGoogleService(services.autocomplete, "getPlacePredictions", { input, ...settings })
      setOptions(opts)
    } catch {
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  const resetOptions = () => setOptions([])

  return [
    options,
    debounce(autocomplete, DEBOUNCE_TIME),
    loading,
    resetOptions,
  ]
}

export type Places = {
  details: (req: PlaceDetailsRequest) => Promise<PlaceResult>,
}
const places: Places = {
  details: (req) => callGoogleService(services.places, "getDetails", req),
}
export const usePlaces = (): Places => places
