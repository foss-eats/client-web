import React, { FC } from "react"
import { TextField, Autocomplete } from "@mui/material"

import { GoogleMapsContext } from "lib/googleMaps"

import { useAddressSearch } from "./hooks"


export type Props = {
  onSubmit?: (postalCode: string) => void,
}
const AddressSearch: FC<Props> = ({ onSubmit }) => (
  <GoogleMapsContext>
    <Autocomplete
      {...useAddressSearch(onSubmit)}
      sx={{ minWidth: "25em" }}
      autoComplete
      includeInputInList
      renderInput={params => (<TextField color="secondary" {...params} />)}
    />
  </GoogleMapsContext>
)
export default AddressSearch
