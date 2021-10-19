import React, { FC } from "react"
import Link from "next/link"

import { Props } from "pages/store/[storeId]"
import { useTranslations } from "models/i18n"


export type Translations = {
  headline: string,
  description: (props: Props) => string,
  linkBody: (props: Props) => string,
}
const EmptyCart: FC<Props> = (props) => {
  const translations = useTranslations().pages.store.byId.cart.emptyCart
  return (<>
    <h1>{translations.headline}</h1>
    <p>{translations.description(props)}</p>
    <p>
      <Link href={`/store/${props.store.id}`} passHref>
        <a>{translations.linkBody(props)}</a>
      </Link>
    </p>
  </>)
}
export default EmptyCart
