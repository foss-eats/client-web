import React, { FC, PropsWithChildren } from "react"

import { StoreProps } from "pages/store/[storeId]"
import { Cart as CartData } from "models/cart"
import CartTable from "./Table"


export type Props = StoreProps & {
  cart: CartData,
}
const Cart: FC<Props> = ({ store, cart }) => {
  return (<>
    <Section title="Cart">
      <CartTable store={store} {...cart} />
    </Section>
    <Section title="Delivery">
      
    </Section>
    <Section title="Payment">
      
    </Section>
  </>)
}
export default Cart

type SectionProps = PropsWithChildren<{ title: string }>
const Section: FC<SectionProps> = ({ title, children }) => (<>
  <h1>{title}</h1>
  <p>{children}</p>
</>)
