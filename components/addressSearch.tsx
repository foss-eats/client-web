import React, { FC, useState } from "react";
import { Input } from "@mui/material";
import GoogleMapsAutocomplete from "react-google-autocomplete";

const getPostalCode = ({ address_components = [] }: google.maps.places.PlaceResult): string | undefined => address_components
  .filter(({types}) => types.includes("postal_code"))
  .map(({long_name}) => long_name)[0]

export type AddressSearchProps = {
  onSubmit?: (postalCode: string) => void,
}
const AddressSearch: FC<AddressSearchProps> = ({ onSubmit = (() => {}) }) => {
  return (
    <Input
      fullWidth
      color="secondary"
      inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
        <GoogleMapsAutocomplete
          ref={inputRef}
          {...props}
          options={{
            componentRestrictions: {
              country: "de",
            },
            types: ["address"],
          }}
          apiKey={process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS}
          onPlaceSelected={(selected) => {
            const postal_code = getPostalCode(selected)
            if (postal_code) onSubmit(postal_code)
          }}
        />
      )}
    />
  )
}
export default AddressSearch
