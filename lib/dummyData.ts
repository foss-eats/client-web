import Decimal from "decimal.js"
import { StoreData } from "lib/types"
import { range } from "ramda"

// TODO: move to backend and stuff
export const stores: StoreData[] = range(0, 10).flatMap(i => [
  {
    id: `${i * 3}`,
    name: `Pizzeria ${i}`,
    postalCodes: ["28203"],
    quisine: ["Pizza", "Pasta", "Italienisch"],
    menu: [
      {
        id: "1",
        name: "Pizza",
        items: [
          {
            id: "1",
            name: "Margarita",
            price: new Decimal("6.50"),
          },
          {
            id: "2",
            name: "Tonno",
            price: new Decimal("7.50"),
          },
          {
            id: "3",
            name: "Hawai",
            price: new Decimal("999.99"),
          },
          {
            id: "4",
            name: "Margarita",
            price: new Decimal("6.50"),
          },
          {
            id: "5",
            name: "Tonno",
            price: new Decimal("7.50"),
          },
          {
            id: "6",
            name: "Hawai",
            price: new Decimal("999.99"),
          },
        ]
      },
      {
        id: "2",
        name: "Pasta",
        items: [
          {
            id: "7",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "8",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
          {
            id: "9",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "10",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
          {
            id: "11",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "12",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
        ]
      },
      {
        id: "3",
        name: "Pasta",
        items: [
          {
            id: "7",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "8",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
          {
            id: "9",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "10",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
          {
            id: "11",
            name: "Carbonara",
            price: new Decimal("5"),
          },
          {
            id: "12",
            name: "Aglio E Olio",
            price: new Decimal("5"),
          },
        ]
      }
    ],
  },
  {
    id: `${i * 3 + 1}`,
    name: `Asia Laden ${i}`,
    postalCodes: ["28203", "28204"],
    quisine: ["Asiatisch", "Chinesisch"],
    menu: [],
  },
  {
    id: `${i * 3 + 2}`,
    name: `Burger ${i}`,
    postalCodes: ["28204"],
    quisine: ["Burger", "US Americanisch"],
    menu: [],
  },
])
