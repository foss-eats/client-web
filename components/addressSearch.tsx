import React, { FC, useEffect } from "react"
import { Input, TextField, Autocomplete } from "@mui/material"

import { useAutocomplete, GoogleMapsContext, usePlaces } from "lib/googleMaps"


const getPostalCode = ({ address_components = [] }: google.maps.places.PlaceResult): string | undefined => address_components
  .filter(({types}) => types.includes("postal_code"))
  .map(({long_name}) => long_name)[0]

export type AddressSearchProps = {
  onSubmit?: (postalCode: string) => void,
}
const AddressSearch: FC<AddressSearchProps> = ({ onSubmit = (() => {}) }) => {
  const [options, getPredictions, loading] = useAutocomplete({
    componentRestrictions: {
      country: "de",
    },
    types: ["address"],
  })
  const places = usePlaces()

  const onPlaceSelected = async(selected: google.maps.places.AutocompletePrediction | null) => {
    if (!selected) return
    console.log(selected)
    try {
      const res = await places.details({ placeId: selected.place_id })
      const postal_code = getPostalCode(res)
      if (postal_code) onSubmit(postal_code)
    } catch {}
  }
  
  return (
    <GoogleMapsContext>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.description}
        filterOptions={(x) => x}
        sx={{
          minWidth: "25em",
        }}
        autoComplete
        includeInputInList
        filterSelectedOptions
        onChange={(evt, value) => onPlaceSelected(value)}
        onInputChange={(evt, input) => getPredictions(input)}
        renderInput={params => <TextField color="secondary" {...params} />}
      />
    </GoogleMapsContext>
  )
}
export default AddressSearch
