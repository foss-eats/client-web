import React, { FC } from "react"
import { identity, prop } from "ramda"
import { TextField, Autocomplete } from "@mui/material"

import { useAutocomplete, GoogleMapsContext, usePlaces } from "lib/googleMaps"


export type AddressSearchProps = {
  onSubmit?: (postalCode: string) => void,
}
const AddressSearch: FC<AddressSearchProps> = ({ onSubmit }) => (
  <GoogleMapsContext>
    <Autocomplete
      {...useAddressSearch(onSubmit)}
      sx={{ minWidth: "25em" }}
      autoComplete
      includeInputInList
      renderInput={params => <TextField color="secondary" {...params} />}
    />
  </GoogleMapsContext>
)
export default AddressSearch


const getPostalCode = ({ address_components = [] }: google.maps.places.PlaceResult): string | undefined => address_components
  .filter(({types}) => types.includes("postal_code"))
  .map(({long_name}) => long_name)[0]

const useAddressSearch = (onSubmit: ((postalCode: string) => void) = (() => {})) => {
  const places = usePlaces()
  const [options, getPredictions, loading, resetOptions] = useAutocomplete({
    componentRestrictions: { country: "de" },
    types: ["address"],
  })

  const onChange = async (evt: unknown, selected: google.maps.places.AutocompletePrediction | null) => {
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
    onInputChange: (evt: unknown, input: string) => getPredictions(input),
    filterOptions: identity,
    getOptionLabel: prop("description"),
  }
}
