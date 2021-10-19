/* eslint-disable camelcase */
// ^ due to use of places api
import { identity, prop } from "ramda"
import { AutocompleteProps } from "@mui/material"

import { noop } from "lib/function"
import { AutocompletePrediction, PlaceResult, useAutocomplete, usePlaces } from "lib/googleMaps"


const getPostalCode = ({ address_components = [] }: PlaceResult): string | undefined => address_components
  .filter(({types}) => types.includes("postal_code"))
  .map(({long_name}) => long_name)[0]

type UseAddressSearch = (onSubmit?: (postalCode: string) => void) => Pick<
  AutocompleteProps<AutocompletePrediction, false, false, false>,
  "options" | "onChange" | "onInputChange" | "filterOptions" | "getOptionLabel">

export const useAddressSearch: UseAddressSearch = (onSubmit = noop) => {
  const places = usePlaces()
  const [options, getPredictions,, resetOptions] = useAutocomplete({
    componentRestrictions: { country: "de" },
    types: ["address"],
  })

  const onChange = async (_evt: unknown, selected: AutocompletePrediction | null) => {
    if (!selected) return
    try {
      const res = await places.details({ placeId: selected.place_id })
      const postal_code = getPostalCode(res)
      if (postal_code) {
        resetOptions()
        onSubmit(postal_code)
      }
    } catch {}
  }

  return {
    options,
    onChange,
    onInputChange: (_evt, input) => getPredictions(input),
    filterOptions: identity,
    getOptionLabel: prop("description"),
  }
}
