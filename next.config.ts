import { NextConfig } from "next"
import { identity } from "ramda"

export default identity<NextConfig>({
  reactStrictMode: true,
})
