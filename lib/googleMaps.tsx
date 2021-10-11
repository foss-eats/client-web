import React, { FC, PropsWithChildren, useCallback, useState } from "react"
import Head from "next/head"
import debounce from "lodash.debounce"
import { clientSide } from "lib/util"


const DEBOUNCE_TIME = 300

const services = {
  places: clientSide(() => {
    const dummyDiv = document.createElement("div")
    return new google.maps.places.PlacesService(dummyDiv)
  }),
  autocomplete: clientSide(() => new google.maps.places.AutocompleteService())
}

type ServiceMethod<Req, Res> = (req: Req, callback: (res: Res | null, status: google.maps.places.PlacesServiceStatus) => void) => void
type ServiceMethodReq<S, M extends keyof S> = S[M] extends ServiceMethod<infer Req, infer Res> ? Req : never
type ServiceMethodRes<S, M extends keyof S> = S[M] extends ServiceMethod<infer Req, infer Res> ? Res : never

const callGoogleService = <S, M extends keyof S>(service: S | null, m: M, req: ServiceMethodReq<S, M>): Promise<ServiceMethodRes<S, M>> =>
  new Promise((resolve, reject) => {
    if (!service) {
      reject("google services not initialized.")
    } else {
      const method = service[m] as any as ServiceMethod<any, any>
      method.call(service, req, (res, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(res as ServiceMethodRes<S, M>)
        } else {
          reject(status)
        }
      })
    }
  })


export const GoogleMapsContext: FC<PropsWithChildren<{}>> = ({ children }) => (
  <>
    <Head>
      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS}&libraries=places`}></script>
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
type UseAutocompleteSettings = Omit<google.maps.places.AutocompletionRequest, "input">

export const useAutocomplete = (settings: UseAutocompleteSettings = {}): UseAutocomplete => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([])

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
    useCallback(debounce(autocomplete, DEBOUNCE_TIME), []),
    loading,
    resetOptions,
  ]
}

export type Places = {
  details: (req: google.maps.places.PlaceDetailsRequest) => Promise<google.maps.places.PlaceResult>,
}
const places: Places = {
  details: (req) => callGoogleService(services.places, "getDetails", req),
}
export const usePlaces = (): Places => places
