import React, { FC, PropsWithChildren } from "react"

import { Props as StoreProps } from "pages/store/[storeId]"
import { Cart as CartData } from "models/cart"
import CartTable from "./Table"
import { useTranslations } from "models/i18n"


export type Translations = {
  cart: {
    title: string,
  },
  delivery: {
    title: string,
  },
  payment: {
    title: string,
  },
}
export type Props = StoreProps & {
  cart: CartData,
}
const Cart: FC<Props> = (props) => {
  return (<>
    <Section title="cart">
      <CartTable {...props} />
    </Section>
    <Section title="delivery">
      
    </Section>
    <Section title="payment">
      
    </Section>
  </>)
}
export default Cart

type SectionProps = PropsWithChildren<{ title: keyof Translations }>
const Section: FC<SectionProps> = ({ title, children }) => {
  const translation = useTranslations().components.Cart.index[title].title
  return (<>
    <h1>{translation}</h1>
    <p>{children}</p>
  </>)
}
